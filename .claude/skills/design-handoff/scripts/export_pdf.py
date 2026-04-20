"""
Handoff Audit PDF Exporter
Usage: python3 export_pdf.py --data '<json>' --output 'path/to/output.pdf'
"""

import argparse
import json
import sys
from datetime import datetime

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import Flowable

# ── XML escaping helper ────────────────────────────────────────────────────────
def escape_xml(text: str) -> str:
    """Escape XML special characters to prevent ReportLab Paragraph XML parsing errors."""
    if not isinstance(text, str):
        text = str(text)
    return (text
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#39;"))

# ── Colour palette ────────────────────────────────────────────────────────────
C_BRAND       = HexColor("#5A4EBA")   # purple — header / accent
C_BRAND_LIGHT = HexColor("#EEEDfe")   # purple tint
C_GREEN       = HexColor("#0F6E56")
C_GREEN_BG    = HexColor("#E1F5EE")
C_AMBER       = HexColor("#854F0B")
C_AMBER_BG    = HexColor("#FAEEDA")
C_RED         = HexColor("#A32D2D")
C_RED_BG      = HexColor("#FCEBEB")
C_GRAY        = HexColor("#5F5E5A")
C_GRAY_LIGHT  = HexColor("#F1EFE8")
C_GRAY_MID    = HexColor("#D3D1C7")
C_BLUE        = HexColor("#185FA5")
C_BLUE_BG     = HexColor("#E6F1FB")
C_TEXT        = HexColor("#2C2C2A")
C_TEXT_MID    = HexColor("#5F5E5A")
C_TEXT_LIGHT  = HexColor("#888780")
C_WHITE       = white

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
CONTENT_W = PAGE_W - 2 * MARGIN

# ── Status helpers ─────────────────────────────────────────────────────────────
STATUS_ICON  = {"pass": "OK", "flag": "[!]", "na": "-", "info": "(i)"}
STATUS_COLOR = {"pass": C_GREEN, "flag": C_AMBER, "na": C_TEXT_LIGHT, "info": C_TEXT_LIGHT}
STATUS_BG    = {"pass": C_GREEN_BG, "flag": C_AMBER_BG, "na": C_GRAY_LIGHT, "info": C_GRAY_LIGHT}

VERDICT_COLOR = {"Ready": C_GREEN, "Needs Work": C_AMBER, "Not Ready": C_RED}
VERDICT_BG    = {"Ready": C_GREEN_BG, "Needs Work": C_AMBER_BG, "Not Ready": C_RED_BG}

# ── Paragraph styles ──────────────────────────────────────────────────────────
def make_styles():
    return {
        "h1": ParagraphStyle("h1", fontSize=20, fontName="Helvetica-Bold",
                             textColor=C_WHITE, leading=26),
        "h1sub": ParagraphStyle("h1sub", fontSize=10, fontName="Helvetica",
                                textColor=HexColor("#D3D1C7"), leading=14),
        "h2": ParagraphStyle("h2", fontSize=13, fontName="Helvetica-Bold",
                             textColor=C_TEXT, leading=18, spaceBefore=6),
        "h3": ParagraphStyle("h3", fontSize=10, fontName="Helvetica-Bold",
                             textColor=C_WHITE, leading=14),
        "body": ParagraphStyle("body", fontSize=9, fontName="Helvetica",
                               textColor=C_TEXT, leading=13),
        "body_sm": ParagraphStyle("body_sm", fontSize=8, leading=12,
                                  textColor=C_TEXT_MID, fontName="Helvetica"),
        "label": ParagraphStyle("label", fontSize=8, fontName="Helvetica-Bold",
                                textColor=C_TEXT, leading=12),
        "note": ParagraphStyle("note", fontSize=8, fontName="Helvetica",
                               textColor=C_TEXT_MID, leading=11),
        "metric_val": ParagraphStyle("metric_val", fontSize=22,
                                     fontName="Helvetica-Bold", textColor=C_TEXT,
                                     leading=26, alignment=TA_CENTER),
        "metric_lbl": ParagraphStyle("metric_lbl", fontSize=8,
                                     fontName="Helvetica", textColor=C_TEXT_MID,
                                     leading=11, alignment=TA_CENTER),
        "priority_title": ParagraphStyle("priority_title", fontSize=9,
                                         fontName="Helvetica-Bold", textColor=C_TEXT,
                                         leading=13),
        "priority_body": ParagraphStyle("priority_body", fontSize=8,
                                        fontName="Helvetica", textColor=C_TEXT_MID,
                                        leading=12),
        "section_flag": ParagraphStyle("section_flag", fontSize=8,
                                       fontName="Helvetica", textColor=C_AMBER,
                                       leading=11),
        "info_banner": ParagraphStyle("info_banner", fontSize=8,
                                      fontName="Helvetica-Oblique",
                                      textColor=C_TEXT_LIGHT, leading=11),
    }

S = make_styles()

# ── Custom flowables ───────────────────────────────────────────────────────────
class ColorRect(Flowable):
    """Full-width coloured rectangle (header band)."""
    def __init__(self, height, color, content_fn=None):
        super().__init__()
        self.rect_h = height
        self.color = color
        self.content_fn = content_fn
        self.width = CONTENT_W
        self.height = height

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, self.width, self.rect_h, fill=1, stroke=0)
        if self.content_fn:
            self.content_fn(self.canv, self.width, self.rect_h)


class ScoreBadge(Flowable):
    """Rounded verdict badge."""
    def __init__(self, text, fg, bg, width=90, height=20):
        super().__init__()
        self.text = text
        self.fg = fg
        self.bg = bg
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        c.setFillColor(self.bg)
        c.roundRect(0, 0, self.width, self.height, radius=4, fill=1, stroke=0)
        c.setFillColor(self.fg)
        c.setFont("Helvetica-Bold", 8)
        c.drawCentredString(self.width / 2, 6, self.text)


# ── Build blocks ──────────────────────────────────────────────────────────────

def header_block(data):
    """Gradient-ish purple header."""
    verdict = data.get("verdict", "Needs Work")
    v_color = VERDICT_COLOR.get(verdict, C_AMBER)
    v_bg    = VERDICT_BG.get(verdict, C_AMBER_BG)

    def draw_content(canv, w, h):
        # File name
        canv.setFillColor(C_WHITE)
        canv.setFont("Helvetica-Bold", 18)
        canv.drawString(16, h - 30, data.get("file_name", "Handoff Audit"))
        # Subtitle
        canv.setFont("Helvetica", 9)
        canv.setFillColor(HexColor("#B4B2A9"))
        canv.drawString(16, h - 44, f"Design Handoff Audit · {data.get('date', '')}")
        # Verdict badge (right side)
        badge_w, badge_h = 88, 20
        canv.setFillColor(v_bg)
        canv.roundRect(w - badge_w - 14, h - 38, badge_w, badge_h, radius=4, fill=1, stroke=0)
        canv.setFillColor(v_color)
        canv.setFont("Helvetica-Bold", 8)
        canv.drawCentredString(w - 14 - badge_w / 2, h - 25, verdict)

    return ColorRect(56, C_BRAND, draw_content)


def metrics_row(data):
    score   = data.get("score", 0)
    total   = data.get("total", 1)
    pct     = data.get("pct", 0)
    screens = data.get("screens", 0)
    def cell(val, lbl):
        return [Paragraph(escape_xml(str(val)), S["metric_val"]),
                Paragraph(escape_xml(lbl), S["metric_lbl"])]

    t = Table(
        [[cell(score, f"of {total} passed"),
          cell(f"{pct}%", "readiness score"),
          cell(screens, "screens audited")]],
        colWidths=[CONTENT_W / 3] * 3,
        rowHeights=[48]
    )
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), C_GRAY_LIGHT),
        ("ROUNDEDCORNERS", [4]),
        ("ALIGN",      (0, 0), (-1, -1), "CENTER"),
        ("VALIGN",     (0, 0), (-1, -1), "MIDDLE"),
        ("LINEAFTER",  (0, 0), (1, 0),   0.5, C_GRAY_MID),
    ]))
    return t


def section_summary_table(sections):
    rows = [[
        Paragraph("Section", S["label"]),
        Paragraph("Score", S["label"]),
        Paragraph("Top flag", S["label"]),
    ]]
    for sec in sections:
        is_info = "not scored" in str(sec.get("score", "")).lower() or sec.get("info_only")
        flag_style = S["info_banner"] if is_info else S["section_flag"]
        rows.append([
            Paragraph(escape_xml(sec["title"]), S["body"]),
            Paragraph(escape_xml(sec.get("score", "—")), S["body_sm"]),
            Paragraph(escape_xml(sec.get("flag", "")), flag_style),
        ])

    col_w = [CONTENT_W * 0.32, CONTENT_W * 0.13, CONTENT_W * 0.55]
    t = Table(rows, colWidths=col_w, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0),  C_BRAND_LIGHT),
        ("FONTNAME",    (0, 0), (-1, 0),  "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0),  8),
        ("TEXTCOLOR",   (0, 0), (-1, 0),  C_BRAND),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [C_WHITE, C_GRAY_LIGHT]),
        ("GRID",        (0, 0), (-1, -1), 0.3, C_GRAY_MID),
        ("VALIGN",      (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING",  (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING",(0,0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",(0, 0), (-1, -1), 6),
    ]))
    return t


def priority_block(priorities):
    items = []
    for p in priorities:
        num   = escape_xml(str(p.get("num", "")))
        title = escape_xml(p.get("title", ""))
        body  = escape_xml(p.get("body", ""))
        row = Table(
            [[Paragraph(num, S["label"]),
              [Paragraph(title, S["priority_title"]),
               Paragraph(body,  S["priority_body"])]]],
            colWidths=[18, CONTENT_W - 18],
        )
        row.setStyle(TableStyle([
            ("VALIGN",      (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING",(0, 0), (-1, -1), 0),
            ("TOPPADDING",  (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING",(0,0), (-1, -1), 6),
        ]))
        items.append(row)
    return items


def section_detail_block(section):
    """One full section with coloured header + item rows."""
    elements = []

    is_info = "not scored" in str(section.get("score", "")).lower() or section.get("info_only")
    header_bg = C_GRAY if is_info else C_BRAND

    # Section header bar
    title_text = f"{section['title']}  {section.get('score','')}"
    if is_info:
        title_text += "  (informational — not scored)"

    def draw_sec_header(canv, w, h):
        canv.setFillColor(C_WHITE)
        canv.setFont("Helvetica-Bold", 9)
        canv.drawString(10, h / 2 - 4, title_text)

    elements.append(ColorRect(22, header_bg, draw_sec_header))
    elements.append(Spacer(1, 2))

    # Item rows
    for item in section.get("items", []):
        st   = item.get("status", "na")
        icon = STATUS_ICON.get(st, STATUS_ICON["na"])
        fg   = STATUS_COLOR.get(st, STATUS_COLOR["na"])
        bg   = STATUS_BG.get(st, STATUS_BG["na"])

        icon_para = Paragraph(
            escape_xml(icon),
            ParagraphStyle("ico", fontSize=9, fontName="Helvetica-Bold",
                           leading=13, textColor=fg)
        )
        id_para   = Paragraph(escape_xml(item.get("id", "")), S["label"])
        note_para = Paragraph(escape_xml(item.get("note", "")), S["note"])

        row = Table(
            [[icon_para, [id_para, note_para]]],
            colWidths=[14, CONTENT_W - 14],
        )
        row.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, -1), bg),
            ("VALIGN",       (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING",  (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING",   (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 4),
            ("LINEBELOW",    (0, 0), (-1, -1), 0.3, C_GRAY_MID),
        ]))
        elements.append(row)
        elements.append(Spacer(1, 1))

    elements.append(Spacer(1, 8))
    return KeepTogether(elements) if len(elements) < 12 else elements


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(C_TEXT_LIGHT)
    canvas.drawString(MARGIN, 10 * mm, "Design Handoff Audit — generated by figma-handoff-audit skill")
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


# ── Main ──────────────────────────────────────────────────────────────────────

def build_pdf(data: dict, output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=20 * mm,
        title=f"Handoff Audit — {data.get('file_name', '')}",
        author="figma-handoff-audit skill",
    )

    story = []

    # ── Header ────────────────────────────────────────────────────────────────
    story.append(header_block(data))
    story.append(Spacer(1, 8))

    # ── Metrics ───────────────────────────────────────────────────────────────
    story.append(metrics_row(data))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "* Accessibility (Section 9) excluded from score. "
        "Some items marked N/A and removed from denominator.",
        S["body_sm"]
    ))
    story.append(Spacer(1, 12))

    # ── Section summary table ─────────────────────────────────────────────────
    story.append(Paragraph("Section scores", S["h2"]))
    story.append(Spacer(1, 4))
    sections_with_a11y = data.get("sections", []).copy()
    if data.get("a11y_items"):
        sections_with_a11y.append({
            "title": "9 · Accessibility",
            "score": "not scored",
            "flag": "Informational only",
            "info_only": True
        })
    story.append(section_summary_table(sections_with_a11y))
    story.append(Spacer(1, 14))

    # ── Priority actions ──────────────────────────────────────────────────────
    story.append(HRFlowable(width=CONTENT_W, thickness=0.5, color=C_GRAY_MID))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Priority actions before handoff", S["h2"]))
    story.append(Spacer(1, 6))
    for item in priority_block(data.get("priorities", [])):
        story.append(item)
    story.append(Spacer(1, 14))

    # ── Full item-by-item breakdown ───────────────────────────────────────────
    story.append(HRFlowable(width=CONTENT_W, thickness=0.5, color=C_GRAY_MID))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Full item-by-item breakdown", S["h2"]))
    story.append(Spacer(1, 6))

    for section in data.get("sections", []):
        block = section_detail_block(section)
        if isinstance(block, list):
            story.extend(block)
        else:
            story.append(block)

    # ── Accessibility (informational) ─────────────────────────────────────────
    a11y_items = data.get("a11y_items", [])
    if a11y_items:
        a11y_section = {
            "title": "9 · Accessibility",
            "score": "not scored",
            "info_only": True,
            "items": a11y_items,
        }
        block = section_detail_block(a11y_section)
        if isinstance(block, list):
            story.extend(block)
        else:
            story.append(block)

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"PDF saved to: {output_path}")


def build_summary_pdf(data: dict, output_path: str):
    """Export only the header + metrics + section summary table — no item details."""
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=20 * mm,
        title=f"Handoff Summary — {data.get('file_name', '')}",
        author="figma-handoff-audit skill",
    )
    story = []
    story.append(header_block(data))
    story.append(Spacer(1, 8))
    story.append(metrics_row(data))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "* Accessibility (Section 9) excluded from score. "
        "Some items marked N/A and removed from denominator.",
        S["body_sm"]
    ))
    story.append(Spacer(1, 12))
    story.append(Paragraph("Section scores", S["h2"]))
    story.append(Spacer(1, 4))
    sections_with_a11y = data.get("sections", []).copy()
    if data.get("a11y_items"):
        sections_with_a11y.append({
            "title": "9 · Accessibility",
            "score": "not scored",
            "flag": "Informational only",
            "info_only": True
        })
    story.append(section_summary_table(sections_with_a11y))
    story.append(Spacer(1, 14))
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"Summary PDF saved to: {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Export handoff audit as PDF")
    parser.add_argument("--data",         required=True,       help="Audit data as JSON string")
    parser.add_argument("--output",       required=True,       help="Output PDF path")
    parser.add_argument("--summary-only", action="store_true", help="Export only the summary table (no item details)")
    args = parser.parse_args()

    try:
        audit_data = json.loads(args.data)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}", file=sys.stderr)
        sys.exit(1)

    # Validate required structure
    if not isinstance(audit_data, dict):
        print("Error: audit_data must be a JSON object/dict", file=sys.stderr)
        sys.exit(1)

    if "file_name" not in audit_data:
        print("Error: audit_data missing required field 'file_name'", file=sys.stderr)
        sys.exit(1)
    if not isinstance(audit_data["file_name"], str):
        print(f"Error: 'file_name' must be a string, got {type(audit_data['file_name']).__name__}", file=sys.stderr)
        sys.exit(1)

    if "sections" not in audit_data:
        print("Error: audit_data missing required field 'sections'", file=sys.stderr)
        sys.exit(1)
    if not isinstance(audit_data["sections"], list):
        print(f"Error: 'sections' must be a list, got {type(audit_data['sections']).__name__}", file=sys.stderr)
        sys.exit(1)

    for idx, section in enumerate(audit_data["sections"]):
        if not isinstance(section, dict):
            print(f"Error: sections[{idx}] must be an object/dict, got {type(section).__name__}", file=sys.stderr)
            sys.exit(1)
        if "items" not in section:
            print(f"Error: sections[{idx}] missing required field 'items'", file=sys.stderr)
            sys.exit(1)
        if not isinstance(section["items"], list):
            print(f"Error: sections[{idx}]['items'] must be a list, got {type(section['items']).__name__}", file=sys.stderr)
            sys.exit(1)
        if "score" in section and not isinstance(section["score"], str):
            print(f"Error: sections[{idx}]['score'] must be a string if present, got {type(section['score']).__name__}", file=sys.stderr)
            sys.exit(1)

    if args.summary_only:
        build_summary_pdf(audit_data, args.output)
    else:
        build_pdf(audit_data, args.output)