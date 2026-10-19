(() => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const filters = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.language-card[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      const categories = card.dataset.category.split(/\s+/);
      card.hidden = filter !== 'all' && !categories.includes(filter);
    });
  }));

  const languageSelect = document.getElementById('languageSelect');
  document.querySelectorAll('.choose-language').forEach(button => button.addEventListener('click', () => {
    const lang = button.dataset.language;
    if (![...languageSelect.options].some(option => option.value === lang)) {
      const option = document.createElement('option');
      option.value = lang; option.textContent = lang; languageSelect.appendChild(option);
    }
    languageSelect.value = lang;
    document.getElementById('starter').scrollIntoView({behavior:'smooth'});
    languageSelect.focus({preventScroll:true});
  }));

  let selectedMinutes = 15;
  const timeButtons = document.querySelectorAll('.time-option');
  timeButtons.forEach(button => button.addEventListener('click', () => {
    selectedMinutes = Number(button.dataset.minutes);
    timeButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }));

  const form = document.getElementById('planForm');
  const result = document.getElementById('planResult');
  const descriptions = {
    career: 'Connect your learning to a role you want to explore.',
    communication: 'Focus on useful phrases and speaking out loud.',
    culture: 'Build a routine around media, everyday phrases, and cultural context.',
    confidence: 'Start with small wins and practise without worrying about perfection.'
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const language = languageSelect.value;
    const goal = document.getElementById('goalSelect').value;
    document.getElementById('resultTitle').textContent = `${language}: your first-week plan`;
    document.getElementById('resultText').textContent = `${descriptions[goal]} Aim for ${selectedMinutes} minutes a day (${selectedMinutes * 7} minutes across a week).`;
    const list = document.getElementById('resultSteps');
    list.replaceChildren();
    [
      'Days 1–2: learn greetings and 5 useful words.',
      'Days 3–4: practise listening and repeat short phrases.',
      'Days 5–6: write or say 3 sentences using what you learned.',
      'Day 7: review your notes and choose next week’s goal.'
    ].forEach(text => { const li = document.createElement('li'); li.textContent = text; list.appendChild(li); });
    form.hidden = true; result.hidden = false;
  });
  document.getElementById('resetPlan').addEventListener('click', () => {
    result.hidden = true; form.hidden = false; languageSelect.focus();
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
