# Lokalise projects (team 252381)

When the user picks Option B (auto-upload), present this list and ask which project should receive the keys. Store the selected `project_id` for the `mcp__lokalise_pm__upload_file` call.

| # | Name | Project ID | Base language |
|---|---|---|---|
| 1 | Alpha (mobile) | `8638073261253be7f0cf29.76159131` | en |
| 2 | Backend | `1021977861ead20911d557.86303338` | en |
| 3 | Email templates | `516409766351648755bce0.29991512` | es_MX |
| 4 | Help Center Articles | `8194764062a791d6c5d380.50266987` | en |
| 5 | Retail (mobile) | `3514976161264dd62237f4.26728182` | en |
| 6 | Retail (web) | `95723743612685b152a999.54047242` | en |

## Lokalise context

| Setting | Value |
|---|---|
| Team ID | `252381` |
| Source language for upload | `es_MX` (always — the JSON files are written in Spanish) |
| Target languages | `en`, `es_AR`, `es_CO`, `pt_BR` |
| MCP server (project mgmt) | `lokalise_pm` |
| MCP server (software dev) | `lokalise_sd` (read-only — cannot upload) |

## Why upload as `es_MX` regardless of project base language

The JSON file we generate contains Spanish source text taken from the Figma prototype, which is written in es_MX. For projects whose base is `en`, uploading as `lang_iso: es_MX` populates the es_MX target translation; the `en` base will remain empty until copywriters translate. That's intentional — the design source of truth is Spanish, and English is a downstream translation.
