export function displayAuthor(author) {
  const parts = author.split(',').map(s => s.trim());
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : author;
}

export function selectPapers(papers, { query = '', year = '', scope = '', task = '', kind = '', status = '', sort = 'newest' } = {}) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = papers.filter(p => {
    const text = [p.title, p.id, p.venue, ...p.authors, ...p.tasks, ...p.datasets, ...p.modalities, p.summary, p.summary_zh, p.notes].join(' ').toLocaleLowerCase();
    return terms.every(t => text.includes(t)) && (!year || String(p.year) === String(year))
      && (!scope || p.scope === scope) && (!task || p.tasks.includes(task))
      && (!kind || p.kind === kind) && (!status || p.status === status);
  });
  return filtered.sort((a, b) => (sort === 'oldest' ? a.year - b.year : b.year - a.year) || a.title.localeCompare(b.title));
}

function bibEscape(text) {
  return String(text).replace(/\\/g, '\\textbackslash{}').replace(/([&%_#$])/g, '\\$1').replace(/[{}]/g, m => `\\${m}`);
}

export function toBibtex(p) {
  const journalVenues = ['IJCV', 'CVIU', 'Image and Vision Computing'];
  const type = p.status !== 'Published' ? 'misc' : journalVenues.includes(p.venue) ? 'article' : 'inproceedings';
  const fields = { title: `{${p.title}}` };
  if (p.authors.length) fields.author = p.authors.join(' and ');
  fields.year = p.year;
  if (type === 'article') fields.journal = p.venue;
  if (type === 'inproceedings') fields.booktitle = p.venue;
  const url = p.links.paper || p.links.project || p.links.code;
  fields.url = url;
  const arxiv = url.match(/arxiv\.org\/abs\/(\d{4}\.\d{4,5})/);
  if (arxiv && p.status === 'Preprint') { fields.eprint = arxiv[1]; fields.archivePrefix = 'arXiv'; }
  if (p.status === 'Project') fields.note = 'Project resource; no peer-reviewed paper citation verified';
  const entries = Object.entries(fields).map(([key, value]) => `  ${key} = {${key === 'title' ? `{${bibEscape(p.title)}}` : bibEscape(value)}},`);
  return `@${type}{${p.id.replaceAll('-', '')}${p.year},\n${entries.join('\n')}\n}`;
}

export function groupByYear(papers) {
  const groups = [];
  for (const paper of papers) {
    let group = groups.find(g => g.year === paper.year);
    if (!group) { group = { year: paper.year, papers: [] }; groups.push(group); }
    group.papers.push(paper);
  }
  return groups;
}
