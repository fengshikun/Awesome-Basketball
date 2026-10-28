import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { selectPapers, toBibtex, groupByYear } from './catalog.mjs';
const { papers } = JSON.parse(readFileSync(new URL('../data/papers.json', import.meta.url)));
test('search combines English and Chinese with scope and task filters', () => {
  const found = selectPapers(papers, { query: '篮球 指导', task: 'Coaching & feedback', scope: 'Multi-sport' });
  assert(found.some(p => p.id === 'techcoach'));
  assert(found.every(p => p.tasks.includes('Coaching & feedback') && p.scope === 'Multi-sport'));
});
test('a venue year takes precedence over an earlier preprint', () => {
  assert(selectPapers(papers, {year: '2026'}).some(p => p.id === 'techcoach'));
  assert(!selectPapers(papers, {year: '2024'}).some(p => p.id === 'techcoach'));
});
test('a project-only resource exports a transparent misc citation', () => {
  const bib = toBibtex(papers.find(p => p.id === 'nba-event-av'));
  assert.match(bib, /^@misc/);
  assert.match(bib, /no peer-reviewed paper citation verified/);
  assert(!bib.includes('author ='));
});
test('preprints and published papers remain distinct in citation export', () => {
  assert.match(toBibtex(papers.find(p => p.id === 'basketballbench')), /archivePrefix = \{arXiv\}/);
  assert.match(toBibtex(papers.find(p => p.id === 'techcoach')), /^@inproceedings/);
});
test('year groups follow requested chronology and empty search returns no papers', () => {
  const groups = groupByYear(selectPapers(papers, {sort: 'oldest'}));
  assert(groups.every((g,i) => i === 0 || groups[i-1].year < g.year));
  assert.equal(selectPapers(papers, {query: 'no-match-8f921'}).length, 0);
});
