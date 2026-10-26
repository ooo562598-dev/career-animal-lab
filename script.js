/* 保留原站三视图与自动前进流程，改为 RIASEC 六型数据驱动。 */
const { types, questions, careers, choices, calculate, order } = LabData;
const STORAGE_KEY = 'animal-lab-mini-ip-v1';
const state = { current: 0, answers: Array(30).fill(null), view: 'intro', mapType: null, careerId: null };
const $ = id => document.getElementById(id);
const els = {
  intro: $('intro-view'), quiz: $('quiz-view'), result: $('result-view'), start: $('start-button'), back: $('back-button'),
  progress: $('progress-value'), count: $('question-count'), progressText: $('progress-text'), number: $('question-number'), title: $('question-title'), options: $('options'),
  resultBadge: $('result-badge'), resultCat: $('result-cat'), resultTitle: $('result-title'), resultSubtitle: $('result-subtitle'),
  resultDescription: $('result-description'), resultTips: $('result-tips'), mixBars: $('mix-bars'), restart: $('restart-button'), share: $('share-button'), shareStatus: $('share-status')
};
let advanceTimer = null, busy = false, storageAvailable = true;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function cancelAdvance() { clearTimeout(advanceTimer); advanceTimer = null; busy = false; }
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ...state })); }
  catch { storageAvailable = false; $('save-note').textContent = '当前浏览器无法保存进度，刷新后需要重新开始。'; }
}
function restore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!raw || raw.version !== 1 || !Array.isArray(raw.answers) || raw.answers.length !== 30) return;
    if (!raw.answers.every(v => v === null || (Number.isInteger(v) && v >= 1 && v <= 5))) return;
    const firstBlank = raw.answers.indexOf(null);
    if (firstBlank >= 0 && raw.answers.slice(firstBlank).some(v => v !== null)) return;
    if (!Number.isInteger(raw.current) || raw.current < 0 || raw.current > 29) return;
    state.answers = raw.answers;
    state.current = Math.min(raw.current, firstBlank === -1 ? 29 : firstBlank);
    state.view = ['intro','quiz','result'].includes(raw.view) ? raw.view : 'intro';
    if (state.view === 'result' && firstBlank !== -1) state.view = 'quiz';
    if (state.view === 'quiz' && firstBlank === -1) state.view = 'result';
    const allowed = firstBlank === -1 ? calculate(state.answers).top : [];
    state.mapType = allowed.includes(raw.mapType) ? raw.mapType : null;
    state.careerId = state.mapType && careers[state.mapType].some(c => c.id === raw.careerId) ? raw.careerId : null;
  } catch { /* 无效或旧版存档安全回到首页。 */ }
}
function focusOn(element) { element.focus({ preventScroll: true }); }
function showView(name, focus = true) {
  cancelAdvance(); state.view = name;
  [els.intro, els.quiz, els.result].forEach(item => item.classList.toggle('is-active', item === els[name]));
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  if (focus) focusOn(name === 'intro' ? $('main-title') : name === 'quiz' ? els.title : els.resultTitle);
  save();
}
function progressLabel(position) {
  if (position < 7) return '推开研究所的门';
  if (position < 15) return '兴趣线索收集中';
  if (position < 23) return '小动物快露面了';
  if (position < 29) return '再探索一小会儿';
  return '最后一题，凭直觉！';
}
function renderQuestion(focus = true) {
  const question = questions[state.current], position = state.current + 1;
  const completed = state.answers.filter(v => v !== null).length;
  els.count.textContent = `${String(position).padStart(2, '0')} / 30`;
  els.progress.style.width = `${completed / 30 * 100}%`;
  $('progress-track').setAttribute('aria-valuenow', completed);
  els.progressText.textContent = progressLabel(state.current);
  els.number.textContent = `Q${String(position).padStart(2, '0')}`;
  els.title.textContent = question.text;
  els.back.disabled = state.current === 0; els.options.innerHTML = '';
  choices.forEach((option, index) => {
    const value = index + 1, button = document.createElement('button');
    button.type = 'button'; button.className = `option${state.answers[state.current] === value ? ' selected' : ''}`;
    button.setAttribute('aria-pressed', String(state.answers[state.current] === value));
    button.innerHTML = `<span class="option-face">${LabArt.face(value)}</span><span class="option-text">${option}</span><span class="option-check" aria-hidden="true">✓</span>`;
    button.addEventListener('click', () => chooseOption(value)); els.options.appendChild(button);
  });
  if (focus) focusOn(els.title);
}
function chooseOption(value) {
  if (busy || state.view !== 'quiz') return;
  busy = true; const answeredIndex = state.current;
  state.answers[answeredIndex] = value; state.mapType = null; state.careerId = null;
  [...els.options.children].forEach((button, i) => {
    button.classList.toggle('selected', i + 1 === value); button.setAttribute('aria-pressed', String(i + 1 === value)); button.disabled = true;
  });
  const completed = state.answers.filter(v => v !== null).length;
  els.progress.style.width = `${completed / 30 * 100}%`; $('progress-track').setAttribute('aria-valuenow', completed); save();
  advanceTimer = window.setTimeout(() => {
    busy = false; advanceTimer = null;
    if (state.view !== 'quiz' || state.current !== answeredIndex) return;
    if (state.current < 29) { state.current++; renderQuestion(); save(); }
    else renderResult();
  }, reducedMotion ? 50 : 230);
}
function renderResult(focus = true) {
  const result = calculate(state.answers), cat = types[result.winner];
  els.resultBadge.textContent = `${result.winner} · ${cat.theory}兴趣`; els.resultBadge.style.background = cat.color;
  els.resultCat.innerHTML = LabArt.avatar(result.winner, `${cat.animal}，${cat.name}`); els.resultCat.style.background = cat.color;
  els.resultTitle.textContent = `${cat.animal} · ${cat.name}`; els.resultSubtitle.textContent = cat.subtitle;
  els.resultDescription.textContent = cat.description;
  $('result-keywords').innerHTML = cat.keywords.map(k => `<span>${k}</span>`).join('');
  $('team-role').textContent = `项目里可以试试：${cat.role}`;
  const low = Math.max(...Object.values(result.scores)) < 15;
  $('tie-note').textContent = low ? '这次暂未发现明显吸引你的活动。先展示一个探索伙伴，不代表你已经确定方向；可以从真实体验里慢慢找。'
    : result.flat ? '六类兴趣并列，暂时没有单一主型。先按固定顺序展示小熊猫，六片职业星空都可以逛逛。'
    : result.tied.length > 1 ? `同样突出：${result.tied.map(t => `${t} ${types[t].name}`).join('、')}。默认动物按固定规则先展示，你的兴趣不止一种。`
    : '这是你在这组活动中的相对兴趣倾向，不是固定性格标签，也不是能力评价。';
  if (low && result.tied.length > 1) $('tie-note').textContent += ` 同最高分的兴趣：${result.tied.join('、')}，没有随机选型。`;
  els.resultTips.innerHTML = cat.tips.map(tip => `<li>${tip}</li>`).join('');
  els.mixBars.innerHTML = result.top.map(t => `<span style="--type-color:${types[t].color}"><b>${t}</b> ${types[t].name}${result.tied.includes(t) && result.tied.length > 1 ? ' · 并列' : ''}</span>`).join('');
  if (!result.top.includes(state.mapType)) state.mapType = result.winner;
  renderMap(result); $('career-detail').hidden = true;
  if (state.careerId) showCareer(state.careerId, false);
  updateStart(); showView('result', focus);
}
// 固定八个锚点：文字保持 HTML，窄屏纵向拉开，不整体缩小文字。
const anchors = [[32,10],[68,10],[82,31],[82,69],[68,90],[32,90],[18,69],[18,31]];
function renderMap(result = calculate(state.answers)) {
  const active = state.mapType; $('map-switch').innerHTML = '';
  result.top.forEach(t => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = `${t} ${types[t].theory}`;
    button.style.setProperty('--type-color', types[t].color); button.setAttribute('aria-pressed', String(t === active));
    button.addEventListener('click', () => {
      state.mapType = t; state.careerId = null; $('career-detail').hidden = true;
      renderMap(result); save(); focusOn([...$('map-switch').children].find(b => b.getAttribute('aria-pressed') === 'true'));
    }); $('map-switch').appendChild(button);
  });
  $('map-caption').textContent = `${types[active].theory}兴趣的 8 个职业方向${active !== result.winner ? ' · 带着你的动物身份继续探索' : ''}`;
  $('map-center').innerHTML = `${LabArt.avatar(result.winner)}<strong>${types[result.winner].animal}</strong><small>未来有很多种样子</small>`;
  $('map-lines').innerHTML = anchors.map(([x,y],i) => `<path d="M300 280 Q${300+(i%2?25:-25)} ${y*5.6} ${x*6} ${y*5.6}"/>`).join('');
  $('career-nodes').innerHTML = '';
  careers[active].forEach((career,i) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'career-node'; button.dataset.career = career.id;
    button.style.cssText = `--x:${anchors[i][0]}%;--y:${anchors[i][1]}%;--delay:${i*35}ms;--node-color:${types[active].color}`;
    button.setAttribute('aria-controls','career-detail'); button.setAttribute('aria-expanded','false');
    button.innerHTML = `<span class="node-spark" aria-hidden="true">✦</span><span>${career.name}</span>`;
    button.addEventListener('click', () => showCareer(career.id)); $('career-nodes').appendChild(button);
  });
}
function showCareer(id, scroll = true) {
  const career = careers[state.mapType]?.find(c => c.id === id); if (!career) return;
  const { winner } = calculate(state.answers); state.careerId = id;
  $('career-animal').textContent = `${types[winner].animal} · ${types[winner].name} 的职业体验`;
  $('career-title').textContent = career.name; $('career-art').innerHTML = LabArt.scene(winner, career);
  $('career-intro').textContent = career.intro; $('career-work').textContent = career.work; $('career-learn').textContent = career.learn;
  $('career-reference').innerHTML = `参考职业：<a href="${career.source}" target="_blank" rel="noopener">O*NET® ${career.soc}（兴趣代码 ${career.interestCode}）</a>。中文岗位为探索方向，可能与参考职业有范围差异。${career.interestCode[0] !== state.mapType ? '本方向包含当前兴趣，但它不是参考职业的首位兴趣。' : ''}`;
  const section = $('career-detail'); section.hidden = false;
  section.classList.remove('scene-enter'); void section.offsetWidth; section.classList.add('scene-enter');
  document.querySelectorAll('.career-node').forEach(button => {
    const selected = button.dataset.career === id; button.classList.toggle('selected',selected); button.setAttribute('aria-expanded',String(selected));
  });
  if (scroll) { section.scrollIntoView({ behavior: reducedMotion?'instant':'smooth', block:'start' }); focusOn($('career-title')); } save();
}
function updateStart() {
  const n = state.answers.filter(v => v !== null).length;
  els.start.querySelector('span').textContent = n === 30 ? '查看我的动物报告' : n ? `继续探索（已答 ${n}/30）` : '领取我的动物身份';
  if (storageAvailable) $('save-note').textContent = n ? '已记住你的进度，随时回来接着探索。' : '';
}
function reportText() {
  const result = calculate(state.answers), animal = types[result.winner];
  const selected = careers[state.mapType]?.find(c=>c.id===state.careerId);
  return `我的创业动物探索报告\n${animal.animal} · ${animal.name}（${result.winner} ${animal.theory}兴趣）\n${animal.subtitle}\n${$('tie-note').textContent}\n兴趣伙伴：${result.top.map(t=>`${t} ${types[t].name}`).join('、')}\n项目角色：${animal.role}\n${selected?`正在探索：${selected.name}\n${selected.work}\n学习起点：${selected.learn}\n` : ''}参考霍兰德 RIASEC 与 O*NET® Interest Profiler 框架的趣味改编，尚未完成测量验证，仅供职业兴趣探索，不是能力诊断或官方标准化测评。\n#创业动物研究所`;
}
els.start.addEventListener('click', () => {
  if (state.answers.every(v=>v!==null)) { renderResult(); return; }
  if (state.answers[state.current] !== null) state.current = state.answers.indexOf(null);
  renderQuestion(false); showView('quiz');
});
els.back.addEventListener('click', () => { if (state.current > 0) { cancelAdvance(); state.current--; renderQuestion(); save(); } });
$('home-link').addEventListener('click', event => { event.preventDefault(); updateStart(); showView('intro'); });
els.restart.addEventListener('click', () => {
  cancelAdvance(); state.current = 0; state.answers.fill(null); state.mapType = null; state.careerId = null;
  els.shareStatus.textContent = ''; $('copy-fallback').hidden = true; updateStart(); showView('intro');
});
$('return-map').addEventListener('click', () => {
  const id = state.careerId; state.careerId = null; $('career-detail').hidden = true;
  document.querySelectorAll('.career-node').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-expanded','false');});
  $('map-title').scrollIntoView({ behavior: reducedMotion?'instant':'smooth' });
  focusOn(document.querySelector(`[data-career="${id}"]`) || $('map-title')); save();
});
$('next-career').addEventListener('click', () => {
  const pool = careers[state.mapType], index = pool.findIndex(c=>c.id===state.careerId); showCareer(pool[(index+1)%pool.length].id);
});
els.share.addEventListener('click', async () => {
  const text = reportText();
  try { await navigator.clipboard.writeText(text); els.shareStatus.textContent = '已复制，把这只小动物分享给朋友吧！'; $('copy-fallback').hidden = true; }
  catch {
    $('copy-fallback').hidden = false; $('report-text').value = text; $('report-text').focus(); $('report-text').select();
    els.shareStatus.textContent = '浏览器未允许自动复制，已展开报告，可以手动复制。';
  }
});
$('animal-roll').innerHTML = order.map(t=>`<div title="${t} ${types[t].theory} · ${types[t].name}">${LabArt.avatar(t)}<span>${types[t].animal}</span></div>`).join('');
restore(); updateStart();
if (state.view === 'result') renderResult(false);
else if (state.view === 'quiz') { renderQuestion(false); showView('quiz',false); }
else showView('intro',false);
