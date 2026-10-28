import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve(import.meta.dirname, '..');
const data = JSON.parse(await readFile(resolve(root, 'data/papers.json'), 'utf8'));
const ids = new Set(), titles = new Set();
for (const p of data.papers) {
  assert.match(p.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid id');
  assert(!ids.has(p.id), `Duplicate id: ${p.id}`); ids.add(p.id);
  assert(!titles.has(p.title.toLowerCase()), `Duplicate title: ${p.title}`); titles.add(p.title.toLowerCase());
  assert(Number.isInteger(p.year) && p.year >= 2000 && p.year <= Number(data.updated.slice(0,4)), `Invalid year: ${p.id}`);
  assert(p.first_year <= p.year, `Preprint year after venue year: ${p.id}`);
  for (const key of ['title','venue','summary','summary_zh','verified_on']) assert(p[key]?.length, `Missing ${key}: ${p.id}`);
  assert(['Basketball','Multi-sport'].includes(p.scope));
  assert(['Published','Preprint','Project'].includes(p.status));
  assert(['Benchmark','Dataset','Resource','Survey','Method'].includes(p.kind));
  assert(p.tasks.length && p.modalities.length && p.sources.length, `Missing annotations: ${p.id}`);
  assert(p.status === 'Project' || p.authors.length > 0, `Missing authors: ${p.id}`);
  assert(Object.keys(p.links).length, `Missing links: ${p.id}`);
  for (const url of [...Object.values(p.links), ...p.sources]) assert.equal(new URL(url).protocol, 'https:', `Unsafe URL: ${p.id}`);
  assert(p.verified_on <= data.updated, `Review after update date: ${p.id}`);
}
console.log(`Catalog valid: ${data.papers.length} unique entries, primary sources present, publication status explicit.`);
