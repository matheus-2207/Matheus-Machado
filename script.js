'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
let motionPaused = reducedMotion.matches;
const motionButton = document.querySelector('#motion-toggle');
function updateMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.textContent = motionPaused ? 'Ativar animações' : 'Pausar animações';
}
updateMotion();
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
reducedMotion.addEventListener('change', (event) => { motionPaused = event.matches; updateMotion(); });

// The real heading remains readable for assistive technology and without JavaScript.
const role = document.querySelector('#typed-role');
const roleText = role.textContent;

if (!motionPaused) {
  const animatedRole = document.createElement('span');
  animatedRole.setAttribute('aria-hidden', 'true');
  const accessibleRole = document.createElement('span');
  accessibleRole.className = 'sr-only';
  accessibleRole.textContent = roleText;
  role.replaceChildren(accessibleRole, animatedRole);
  let character = 0;
  function typeRole() {
    if (motionPaused) { animatedRole.textContent = roleText; return; }
    animatedRole.textContent = roleText.slice(0, ++character);
    if (character < roleText.length) window.setTimeout(typeRole, 32);
  }
  typeRole();
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(max-width: 560px)').addEventListener('change', closeMenu);

// Content is visible by default. Entrance animation is an enhancement, never a gate.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) if (entry.isIntersecting) {
      if (!motionPaused) entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) {
      navigation.querySelectorAll('a').forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));
}

let scrollFrame = false;
const progress = document.querySelector('.scroll-progress');
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
  scrollFrame = false;
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const examples = {
  javascript: {
    file: 'aprendizado.js', command: 'node aprendizado.js', output: 'aprender na prática',
    code: `<span class="syntax-comment">// Um pouco melhor a cada versão.</span>\n<span class="syntax-purple">const</span> jornada = {\n  curiosidade: <span class="syntax-orange">true</span>,\n  ferramentas: [<span class="syntax-green">'HTML'</span>, <span class="syntax-green">'CSS'</span>, <span class="syntax-green">'JS'</span>],\n  próximoPasso: <span class="syntax-green">'aprender na prática'</span>\n};\n\n<span class="syntax-purple">const</span> construir = () =&gt; jornada.próximoPasso;\nconsole.<span class="syntax-blue">log</span>(construir());`
  },
  html: {
    file: 'estrutura.html', command: 'preview estrutura.html', output: 'Estrutura semântica: main → article → h1 + p.',
    code: `<span class="syntax-comment">&lt;!-- Cada elemento tem um propósito. --&gt;</span>\n&lt;<span class="syntax-purple">main</span> id=<span class="syntax-green">"conteudo"</span>&gt;\n  &lt;<span class="syntax-purple">article</span>&gt;\n    &lt;<span class="syntax-purple">h1</span>&gt;Ideias ganham estrutura.&lt;/<span class="syntax-purple">h1</span>&gt;\n    &lt;<span class="syntax-purple">p</span>&gt;\n      O primeiro passo é uma boa base.\n    &lt;/<span class="syntax-purple">p</span>&gt;\n  &lt;/<span class="syntax-purple">article</span>&gt;\n&lt;/<span class="syntax-purple">main</span>&gt;`
  },
  css: {
    file: 'experiencia.css', command: 'preview experiencia.css', output: 'Grid responsivo pronto. Experimente redimensionar a janela.',
    code: `<span class="syntax-comment">/* Uma interface que se adapta. */</span>\n<span class="syntax-green">.projetos</span> {\n  <span class="syntax-blue">display</span>: grid;\n  <span class="syntax-blue">gap</span>: <span class="syntax-orange">1.5rem</span>;\n  <span class="syntax-blue">grid-template-columns</span>: repeat(\n    auto-fit, minmax(<span class="syntax-orange">240px</span>, <span class="syntax-orange">1fr</span>)\n  );\n  <span class="syntax-blue">align-items</span>: start;\n}`
  },
  git: {
    file: 'evolucao.sh', command: 'demo git-workflow', output: 'Demonstração: alterações revisadas e versão registrada.',
    code: `<span class="syntax-comment"># Cada mudança conta uma história.</span>\n<span class="syntax-purple">git</span> switch -c <span class="syntax-green">"feat/nova-ideia"</span>\n\n<span class="syntax-comment"># Construir. Revisar. Melhorar.</span>\n<span class="syntax-purple">git</span> status\n<span class="syntax-purple">git</span> diff\n<span class="syntax-purple">git</span> add index.html\n<span class="syntax-purple">git</span> commit -m <span class="syntax-green">"Melhora a experiência"</span>\n<span class="syntax-purple">git</span> log --oneline`
  }
};
let activeSkill = 'javascript';
let runTimer;
const tabs = [...document.querySelectorAll('[role="tab"]')];
const output = document.querySelector('#terminal-output');
const runButton = document.querySelector('#run-code');
function selectSkill(skill, focus = false) {
  if (!examples[skill]) return;
  clearTimeout(runTimer);
  activeSkill = skill;
  const example = examples[skill];
  tabs.forEach((tab) => {
    const active = tab.dataset.skill === skill;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  document.querySelector('#skill-panel').setAttribute('aria-labelledby', `tab-${skill}`);
  document.querySelector('#file-name').textContent = example.file;
  // Only the authored, static examples above are rendered as markup.
  document.querySelector('#skill-code').innerHTML = example.code;
  document.querySelector('#terminal-command').textContent = example.command;
  output.textContent = 'Pronto para executar.';
  output.classList.remove('is-success');
  runButton.disabled = false;
  runButton.firstChild.textContent = 'Executar exemplo ';
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSkill(tab.dataset.skill));
  tab.addEventListener('keydown', (event) => {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); selectSkill(tabs[next].dataset.skill, true);
  });
});
const tabLayout = window.matchMedia('(max-width: 800px)');
function updateTabOrientation() { document.querySelector('[role="tablist"]').setAttribute('aria-orientation', tabLayout.matches ? 'horizontal' : 'vertical'); }
tabLayout.addEventListener('change', updateTabOrientation); updateTabOrientation();
document.querySelectorAll('[data-select]').forEach((node) => node.addEventListener('click', () => selectSkill(node.dataset.select)));
runButton.addEventListener('click', () => {
  clearTimeout(runTimer);
  runButton.disabled = true;
  runButton.firstChild.textContent = 'Executando… ';
  output.classList.remove('is-success');
  output.textContent = 'Executando demonstração…';
  runTimer = setTimeout(() => {
    // This local demo has no eval, shell execution, or external requests.
    if (activeSkill === 'javascript') {
      const jornada = { curiosidade: true, ferramentas: ['HTML', 'CSS', 'JS'], próximoPasso: 'aprender na prática' };
      const construir = () => jornada.próximoPasso;
      output.textContent = construir();
    } else output.textContent = examples[activeSkill].output;
    output.classList.add('is-success');
    runButton.disabled = false;
    runButton.firstChild.textContent = 'Executar novamente ';
  }, motionPaused ? 0 : 600);
});

const cursor = document.querySelector('.cursor-ring');
let cursorFrame = 0;
let pointerX = -100, pointerY = -100;
document.addEventListener('pointermove', (event) => {
  if (motionPaused || !finePointer.matches || event.pointerType === 'touch') return;
  pointerX = event.clientX; pointerY = event.clientY;
  cursor.classList.toggle('is-active', Boolean(event.target.closest('a,button,summary')));
  if (!cursorFrame) cursorFrame = requestAnimationFrame(() => {
    const size = cursor.classList.contains('is-active') ? 40 : 25;
    cursor.style.transform = `translate3d(${pointerX - size / 2}px,${pointerY - size / 2}px,0)`;
    cursor.style.opacity = '1'; cursorFrame = 0;
  });
}, { passive: true });
document.documentElement.addEventListener('pointerleave', () => { cursor.style.opacity = '0'; });
document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('pointermove', (event) => {
    if (motionPaused || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = element.getBoundingClientRect();
    const x = Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * .07));
    const y = Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * .1));
    element.style.transform = `translate(${x}px,${y}px)`;
  });
  element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  element.addEventListener('blur', () => { element.style.transform = ''; });
});

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();
  const message = String(data.get('body')).trim();
  if (!name || message.length < 10) {
    document.querySelector('#form-status').textContent = 'Informe seu nome e escreva uma mensagem com pelo menos 10 caracteres.';
    return;
  }
  const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
  const body = encodeURIComponent(`Olá, Matheus!\n\n${message}\n\n${name}\n${email}`);
  const mailto = `mailto:matheusvm2019@gmail.com?subject=${subject}&body=${body}`;
  contactForm.classList.add('is-ready');
  const status = document.querySelector('#form-status');
  status.replaceChildren(document.createTextNode('Mensagem preparada. Confirme o envio no seu aplicativo de e-mail. '));
  const retry = document.createElement('a');
  retry.href = mailto; retry.textContent = 'Abrir e-mail novamente'; retry.style.textDecoration = 'underline';
  status.append(retry);
  if (!motionPaused) contactForm.querySelector('button').animate([{ transform: 'scale(.98)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' });
  window.location.href = mailto;
});
document.querySelector('#year').textContent = new Date().getFullYear();
