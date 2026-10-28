# Contributing

Thank you for helping build Awesome-Basketball. Suggest a paper with the issue template or submit a pull request that edits `data/papers.json`.

## Inclusion policy

- Include basketball-focused video understanding, analysis, skill assessment, or coaching research, and multi-sport datasets or benchmarks with a documented basketball component.
- Tracking, calibration, segmentation, and re-identification are useful foundations; label them explicitly rather than describing them as high-level reasoning benchmarks.
- Surveys and official project-only resources are welcome when their type and publication status are clear.
- Use primary sources. A survey can identify a lead, but a benchmark entry should link to the original paper or official release.
- Do not invent publication venues, authors, dates, code repositories, or availability claims. Store one record per work; link later versions rather than double-counting them.
- Do not upload paper PDFs, broadcast videos, restricted annotations, access tokens, or private download links.

## Catalog fields

| Field | Meaning |
|---|---|
| `id` | Stable lowercase, hyphen-separated identifier. Used for website anchors. |
| `title`, `authors` | Original title and full author names. Store authors as `Family, Given` when possible. Use an empty author list only for a project whose paper citation has not been verified. |
| `year` | Verified publication year for published work; release year for preprints and project resources. |
| `first_year` | Earliest known public version, which may precede the venue year. |
| `venue` | Verified venue abbreviation, `arXiv`, or `Project`. |
| `status` | `Published`, `Preprint`, or `Project`. |
| `kind` | `Benchmark`, `Dataset`, `Method`, `Survey`, or `Resource`. |
| `scope` | `Basketball` or `Multi-sport` (also covers multi-domain datasets containing basketball). |
| `tasks`, `modalities`, `datasets` | Explicit task labels, inputs, and introduced or used dataset names. |
| `summary`, `summary_zh` | Concise, original English and Chinese descriptions of the task. |
| `notes` | Version, modality, data-lineage, or evaluation-scope caveats. |
| `links` | Verified `paper`, `pdf`, `code`, `project`, or `dataset` URLs. Omit missing links. |
| `sources`, `verified_on` | Primary evidence URLs and date of the bibliographic review. |

The date records the curation review, not an assertion that every dataset file or remote link was downloaded. Multi-sport totals must never be described as basketball-only totals. Automated or LLM-assisted labels should not be called entirely human-annotated.

## Update workflow

Node.js 20 or later is required; no package installation is needed.

```sh
npm run check
npm test
npm run build
npm run dev
```

Preview the printed URL, then commit the source catalog and generated `README.md`, `data/basketball.bib`, and `docs/data/` together. `docs/assets/catalog.mjs` is generated from `scripts/catalog.mjs`. Do not maintain these outputs separately.

## Website

The original static implementation is in `docs/`. It supports English and Chinese keyword search, year navigation, task/scope/type/status filters, chronological ordering, citation copying, filtered BibTeX/JSON export, year statistics, and a locally stored light/dark preference.

GitHub Pages uses `.github/workflows/pages.yml`. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. A push to `main` validates, tests, regenerates, and deploys the website. Pull requests validate without deploying. The public project URL is `https://fengshikun.github.io/Awesome-Basketball/`; relative asset paths also work in a local preview.

The workflow does not schedule paper discovery or add unreviewed papers automatically. New records should be checked against their primary sources before merging.
