import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { selectPapers, groupByYear, toBibtex } from './catalog.mjs';
const root = resolve(import.meta.dirname, '..');
const catalog = JSON.parse(await readFile(resolve(root, 'data/papers.json'), 'utf8'));
const papers = selectPapers(catalog.papers);
await mkdir(resolve(root, 'docs/data'), { recursive: true });
const bibliography = papers.map(toBibtex).join('\n\n') + '\n';
await writeFile(resolve(root, 'data/basketball.bib'), bibliography);
await writeFile(resolve(root, 'docs/data/basketball.bib'), bibliography);
await writeFile(resolve(root, 'docs/data/papers.json'), JSON.stringify(catalog, null, 2) + '\n');
await writeFile(resolve(root, 'docs/data/papers.js'), `// Generated from data/papers.json. Do not edit.\nwindow.BASKETBALL_CATALOG = ${JSON.stringify(catalog).replaceAll('<', '\\u003c')};\n`);
await copyFile(resolve(root, 'scripts/catalog.mjs'), resolve(root, 'docs/assets/catalog.mjs'));
const esc = s => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
const links = p => Object.entries(p.links).filter(([k]) => k !== 'paper' && k !== 'pdf').map(([k, v]) => `[${k === 'code' ? 'Code / Resource' : k === 'dataset' ? 'Data' : 'Project'}](${v})`).join(' · ') || '—';
function table(entries) {
  return '| Venue / Year | Paper / Resource | Project / Code | Dataset · Tasks |\n|---|---|---|---|\n' + entries.map(p => {
    const color = p.status === 'Published' ? '2d5845' : p.status === 'Preprint' ? 'b56435' : '68756a';
    const badge = `![${p.venue} ${p.year}](https://img.shields.io/badge/${encodeURIComponent(`${p.venue} ${p.year}`).replaceAll('-', '--')}-${color})`;
    const href = p.links.paper || p.links.project || p.links.code;
    const name = p.datasets.length ? `**${esc(p.datasets.join(', '))}**<br>` : '';
    const state = p.status !== 'Published' ? ` · *${p.status}*` : '';
    return `| ${badge} | [${esc(p.title)}](${href})${state}<br><sub>${esc(p.scope)} · ${esc(p.summary)}</sub> | ${links(p)} | ${name}${p.tasks.map(esc).join(', ')} |`;
  }).join('\n');
}
const years = [...new Set(papers.map(p => p.year))];
const readme = `# Awesome-Basketball 🏀

A curated collection of **basketball video understanding** papers, datasets, and benchmarks, organized by year.

[![Website](https://img.shields.io/badge/Website-Research%20Library-2d5845)](https://fengshikun.github.io/Awesome-Basketball/)
[![Papers](https://img.shields.io/badge/Entries-${papers.length}-b56435)](data/papers.json)
[![Last curated](https://img.shields.io/badge/Last%20curated-${catalog.updated.replaceAll('-', '--')}-68756a)](data/papers.json)
[![Contributions welcome](https://img.shields.io/badge/Contributions-welcome-2d5845)](CONTRIBUTING.md)

## Entry points

- **[Searchable website](https://fengshikun.github.io/Awesome-Basketball/)** — year navigation, keyword search, task and scope filters, per-paper citations, and filtered exports.
- **[BibTeX bibliography](data/basketball.bib)** · **[Structured catalog](data/papers.json)** · **[Contribution guide](CONTRIBUTING.md)**
- **中文说明：** 本库围绕篮球视频理解整理文献，包含篮球专用数据集、含篮球的多体育评测、动作指导以及跟踪与几何等基础任务；按年份倒序分组。

## Scope and reading notes

- **Basketball** = basketball-focused work. **Multi-sport** = work that includes basketball alongside other sports or activities.
- Published papers use the verified venue year; preprints use their release year. Earlier preprint years are recorded separately as \`first_year\`. Multiple versions of the same work have one entry.
- **Preprint** and **Project** are explicitly marked. Resource-only projects are not presented as peer-reviewed papers.
- Total dataset sizes in multi-sport or multimodal papers are not basketball-video-only counts. Read each task's released annotations and access conditions before comparison.
- Ego-Exo4D, ExpertAF, and EE4D-DescCoach share data lineage. Player tracking IDs, player names, and jersey-number recognition are different evaluation targets.
- The catalog stores primary-source links and the last bibliographic review date. Inclusion does not certify every claim, dataset availability, or license. No videos or paper PDFs are redistributed here.

## Task coverage

Action and event recognition · player identity · temporal and spatial grounding · captioning · VideoQA · human interactions · rules and officiating · tactical reasoning · prediction · skill assessment · coaching feedback · multi-view understanding · streaming · retrieval · tracking and geometry.

## Surveys

${table(papers.filter(p => p.kind === 'Survey'))}

## Papers and resources by year

${years.map(y => `[${y}](#${y})`).join(' · ')}

${groupByYear(papers).map(g => `### ${g.year}\n\n${table(g.papers)}\n`).join('\n')}

## Maintain the library

Edit **\`data/papers.json\`**, then regenerate all views from the same source:

\`\`\`sh
npm run check
npm test
npm run build
npm run dev
\`\`\`

Open the printed local URL. The website has no runtime dependencies and uses relative asset paths for GitHub Pages project hosting. CI validates changes and deploys the generated \`docs/\` folder from \`main\`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the data fields, inclusion policy, and deployment details. To suggest a paper, [open an issue](https://github.com/fengshikun/Awesome-Basketball/issues/new?template=paper.yml).

## Acknowledgments

The bibliography-table format and searchable-library idea are inspired by [Awesome-AQA](https://github.com/ZhouKanglei/Awesome-AQA) and its [AQA-Survey website](https://zhoukanglei.github.io/AQA-Survey/). This repository uses its own implementation and basketball-specific annotations. Credit for all research, datasets, and linked resources belongs to the original authors.

## License

Original website code and original curation text: [MIT](LICENSE). Linked papers, datasets, media, and upstream resources retain their own licenses and access conditions.
`;
await writeFile(resolve(root, 'README.md'), readme);
console.log(`Generated README, BibTeX, and website data for ${papers.length} entries (${Math.min(...years)}–${Math.max(...years)}).`);
