# Lokalise projects (team 252381)

| # | Name | Project ID | Base language | Target locales |
|---|---|---|---|---|
| 1 | Alpha (mobile) | `8638073261253be7f0cf29.76159131` | en | es_MX, es_AR, es_CO, pt_BR |
| 2 | Backend | `1021977861ead20911d557.86303338` | en | es_MX, es_AR, es_CO, pt_BR |
| 3 | Email templates | `516409766351648755bce0.29991512` | es_MX | en, es_AR, es_CO, pt_BR |
| 4 | Help Center Articles | `8194764062a791d6c5d380.50266987` | en | es_MX, es_AR, es_CO, pt_BR |
| 5 | Retail (mobile) | `3514976161264dd62237f4.26728182` | en | es_MX, es_AR, es_CO, pt_BR |
| 6 | Retail (web) | `95723743612685b152a999.54047242` | en | es_MX, es_AR, es_CO, pt_BR |

## Lokalise context

| Setting | Value |
|---|---|
| Team ID | `252381` |
| MCP server (read-only) | `lokalise_sd` — use for fetching keys and translations |
| MCP server (project mgmt) | `lokalise_pm` — use if creating tasks or managing contributors |

## MCP tool reference for this skill

| Action | Tool | Notes |
|---|---|---|
| List all projects | `mcp__lokalise_pm__list_lokalise_projects` | Verify project IDs are current if one is not found |
| Get project languages | `mcp__lokalise_pm__list_project_languages` | Returns language IDs needed for `filter_translation_lang_ids` |
| Fetch keys + translations | `mcp__lokalise_sd__list_lokalise_keys` | Set `include_translations: 1`; paginate with `page` |
| Get single key | `mcp__lokalise_sd__get_lokalise_key` | Use when needing full context for a specific flagged key |
