import { selectPapers, groupByYear, toBibtex, displayAuthor } from './catalog.mjs';

const catalog = window.BASKETBALL_CATALOG;
const $ = s => document.querySelector(s);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const href = url => { try { return new URL(url).protocol === 'https:' ? escapeHTML(url) : '#'; } catch { return '#'; } };
const params = new URLSearchParams(location.search);
const state = Object.fromEntries(['query','year','scope','task','kind','status','sort'].map(key => [key, params.get(key === 'query' ? 'q' : key) || (key === 'sort' ? 'newest' : '')]));
const papers = catalog?.papers || [];
let visible = [], toastTimer, observer;
const taskOrder = ['Action recognition','Event understanding','Player identity','Temporal grounding','Spatial grounding','Captioning','Video QA','Human interaction','Rules & officiating','Tactics & reasoning','Prediction','Skill assessment','Coaching & feedback','Multi-view','Streaming','Retrieval','Tracking & geometry','Survey'];
const availableTasks = taskOrder.filter(task => papers.some(p => p.tasks.includes(task)));
if (!availableTasks.includes(state.task)) state.task = '';
if (!['newest','oldest'].includes(state.sort)) state.sort = 'newest';
const years = [...new Set(papers.map(p => p.year))].sort((a,b) => b-a);
for (const year of years) $('#year').add(new Option(String(year), String(year)));
for (const key of ['year','scope','kind','status','sort']) {
  const control = $(`#${key}`);
  control.value = state[key];
  if (control.selectedIndex === -1) { state[key] = key === 'sort' ? 'newest' : ''; control.value = state[key]; }
  control.addEventListener('change', () => { state[key] = control.value; render(); });
}
$('#search').value = state.query;
$('#search').addEventListener('input', event => { state.query = event.target.value; render(); });
$('#stat-total').textContent = papers.length;
$('#stat-basketball').textContent = papers.filter(p => p.scope === 'Basketball').length;
$('#stat-multi').textContent = papers.filter(p => p.scope === 'Multi-sport').length;
$('#stat-years').textContent = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : '—';
$('#stat-years').style.fontSize = '18px';
$('#total-badge').textContent = papers.length;
$('#updated').textContent = catalog?.updated.replaceAll('-','.') || '';
$('#updated').dateTime = catalog?.updated || '';

function updateURL() {
  const next = new URL(location.href);
  next.search = '';
  for (const [key, value] of Object.entries(state)) if (value && !(key === 'sort' && value === 'newest')) next.searchParams.set(key === 'query' ? 'q' : key, value);
  history.replaceState(null, '', next);
}

function authorLine(p) {
  if (!p.authors.length) return 'Project resource · paper citation forthcoming';
  return p.authors.slice(0,4).map(displayAuthor).join(', ') + (p.authors.length > 4 ? ' et al.' : '');
}

function card(p) {
  const e = escapeHTML;
  const link = p.links.paper || p.links.project || p.links.code;
  const actionLinks = [['paper','Paper ↗'],['code','Code ↗'],['project','Project ↗'],['dataset','Data ↗']].filter(([key]) => p.links[key]).map(([key,label]) => `<a href="${href(p.links[key])}" target="_blank" rel="noopener noreferrer">${label}</a>`).join('');
  return `<article class="paper-card" id="paper-${e(p.id)}">
    <div class="paper-top"><span class="venue-tag">${e(p.venue)} ${p.year}</span><span class="scope-tag">${e(p.scope === 'Multi-sport' ? 'Multi-sport / domain' : 'Basketball focused')}</span>${p.status !== 'Published' ? `<span class="state-tag">${e(p.status === 'Project' ? 'Project resource' : 'Preprint')}</span>` : ''}<span class="paper-kind">${e(p.kind)}</span></div>
    <h3><a href="${href(link)}" target="_blank" rel="noopener noreferrer">${e(p.title)}</a></h3>
    <p class="authors">${e(authorLine(p))}</p>
    <p class="paper-summary">${e(p.summary)}</p>
    <div class="paper-bottom"><div class="paper-tags">${p.tasks.map(t => `<button class="paper-task" type="button" data-task="${e(t)}" aria-label="Filter by ${e(t)}">${e(t)}</button>`).join('')}${p.datasets.length ? `<span class="dataset-tag">${e(p.datasets.join(' · '))}</span>` : ''}</div><div class="paper-actions">${actionLinks}<button class="copy-bib" type="button" data-bib="${e(p.id)}" aria-label="Copy BibTeX for ${e(p.title)}">❝ Bib</button></div></div>
    <details class="paper-details"><summary>Notes, sources & citation</summary><div class="detail-body"><p lang="zh-CN">${e(p.summary_zh)}</p>${p.notes ? `<p class="detail-note">${e(p.notes)}</p>` : ''}<p>${e(p.modalities.join(' · '))}${p.first_year < p.year ? ` · First preprint: ${p.first_year}` : ''} · Bibliographic review: ${e(p.verified_on)}</p><div class="source-links">${p.sources.map((url,i) => `<a href="${href(url)}" target="_blank" rel="noopener noreferrer">Primary source ${i+1} ↗</a>`).join('')}</div><pre><code>${e(toBibtex(p))}</code></pre></div></details>
  </article>`;
}

function render() {
  visible = selectPapers(papers, state);
  const active = Object.entries(state).some(([key,value]) => key !== 'sort' && value);
  $('#clear-filters').hidden = !active;
  $('#results-count').textContent = `Showing ${visible.length} of ${papers.length} entries${state.task ? ` · ${state.task}` : ''}`;
  $('#task-filters').innerHTML = ['', ...availableTasks].map(task => `<button class="task-chip" type="button" data-task="${escapeHTML(task)}" aria-pressed="${state.task === task}">${escapeHTML(task || 'All topics')}</button>`).join('');
  const groups = groupByYear(visible);
  $('#paper-list').innerHTML = visible.length ? groups.map(g => `<section class="year-group" id="year-${g.year}" aria-labelledby="heading-${g.year}"><h3 class="year-heading" id="heading-${g.year}">${g.year}<span>${g.papers.length} ${g.papers.length === 1 ? 'entry' : 'entries'}</span></h3>${g.papers.map(card).join('')}</section>`).join('') : `<div class="no-results"><h3>No papers match this search.</h3><p>Try a broader keyword, another task, or reset your filters.</p><button class="outline-button" type="button" data-reset>Reset all filters</button></div>`;
  $('#year-nav').innerHTML = groups.map((g,i) => `<a class="year-link" href="#year-${g.year}" aria-current="${i === 0}">${g.year}<span>${g.papers.length}</span></a>`).join('') || '<span class="authors">No matching years</span>';
  observer?.disconnect();
  observer = new IntersectionObserver(entries => {
    const entry = entries.find(item => item.isIntersecting);
    if (!entry) return;
    for (const a of document.querySelectorAll('.year-link')) a.setAttribute('aria-current', String(a.hash === `#${entry.target.id}`));
  }, {rootMargin: '-5% 0px -65% 0px', threshold:0});
  document.querySelectorAll('.year-group').forEach(el => observer.observe(el));
  updateURL();
}

function resetFilters() {
  Object.assign(state, {query:'',year:'',scope:'',task:'',kind:'',status:'',sort:'newest'});
  $('#search').value = '';
  for (const key of ['year','scope','kind','status','sort']) $(`#${key}`).value = state[key];
  render();
}

function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3000);
}

document.addEventListener('click', async event => {
  const task = event.target.closest('[data-task]');
  if (task) { state.task = task.dataset.task; render(); }
  const reset = event.target.closest('[data-reset]');
  if (reset) resetFilters();
  const bib = event.target.closest('[data-bib]');
  if (bib) {
    const p = papers.find(paper => paper.id === bib.dataset.bib);
    try { await navigator.clipboard.writeText(toBibtex(p)); toast('BibTeX copied.'); }
    catch { $(`#paper-${p.id} details`).open = true; toast('Clipboard unavailable. Select the citation in the expanded notes.'); }
  }
});
$('#clear-filters').addEventListener('click', resetFilters);
$('#export-button').addEventListener('click', () => {
  $('#export-count').textContent = `${visible.length} matching ${visible.length === 1 ? 'entry is' : 'entries are'} ready to export.`;
  $('#export-dialog').showModal();
});
function download(name, data, type) {
  const url = URL.createObjectURL(new Blob([data], {type}));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#export-dialog').close(); toast(`Exported ${visible.length} ${visible.length === 1 ? 'entry' : 'entries'}.`);
}
$('#download-bib').addEventListener('click', () => download('awesome-basketball.bib', visible.map(toBibtex).join('\n\n') + '\n', 'text/plain;charset=utf-8'));
$('#download-json').addEventListener('click', () => download('awesome-basketball.json', JSON.stringify({...catalog, filters:{...state}, papers:visible},null,2) + '\n', 'application/json;charset=utf-8'));
$('#stats-button').addEventListener('click', () => {
  const counts = years.map(year => ({year,count:papers.filter(p=>p.year===year).length}));
  const max = Math.max(...counts.map(g=>g.count));
  $('#stats-bars').innerHTML = counts.map(g => `<button type="button" class="stats-row" data-year="${g.year}" aria-label="Show ${g.count} ${g.count === 1 ? 'entry' : 'entries'} from ${g.year}"><span>${g.year}</span><span class="stats-track"><span class="stats-fill" style="width:${g.count/max*100}%"></span></span><strong>${g.count}</strong></button>`).join('');
  $('#stats-dialog').showModal();
});
$('#stats-bars').addEventListener('click', event => {
  const button = event.target.closest('[data-year]');
  if (!button) return;
  resetFilters(); state.year = button.dataset.year; $('#year').value = state.year; render(); $('#stats-dialog').close(); $('#library').scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}));
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $('#theme-toggle').setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  $('#theme-toggle').title = `Switch to ${dark ? 'light' : 'dark'} theme`;
}
$('#theme-toggle').addEventListener('click',()=>{
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('basketball-theme',theme); } catch {}
  updateThemeLabel();
});
document.addEventListener('keydown',event=>{
  if(event.key==='/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')){event.preventDefault();$('#search').focus();}
});
updateThemeLabel();
render();
if (location.hash.startsWith('#year-') || location.hash.startsWith('#paper-')) requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());
