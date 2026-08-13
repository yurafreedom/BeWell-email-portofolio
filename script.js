
const drawer = document.getElementById('drawer');
const frame = document.getElementById('emailFrame');
const drawerTitle = document.getElementById('drawerTitle');
const drawerLabel = document.getElementById('drawerLabel');
const openRaw = document.getElementById('openRaw');
const loading = document.getElementById('loading');
let lastTrigger = null;

function openDrawer(button){
  lastTrigger = button;
  const file = button.dataset.file;
  drawerTitle.textContent = button.dataset.title;
  drawerLabel.textContent = button.dataset.label;
  openRaw.href = file;
  loading.hidden = false;
  frame.classList.remove('is-loaded');
  frame.src = file;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden','false');
  document.body.classList.add('drawer-open');
  setTimeout(() => drawer.querySelector('.drawer-close').focus(), 80);
}
function closeDrawer(){
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden','true');
  document.body.classList.remove('drawer-open');
  setTimeout(() => { frame.src='about:blank'; frame.classList.remove('is-loaded'); }, 420);
  if(lastTrigger) lastTrigger.focus();
}

document.querySelectorAll('.case-open').forEach(btn => btn.addEventListener('click', () => openDrawer(btn)));
document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', closeDrawer));
frame.addEventListener('load', () => {
  if(frame.src.endsWith('about:blank')) return;
  loading.hidden = true;
  frame.classList.add('is-loaded');
});
document.addEventListener('keydown', e => { if(e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer(); });

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.case-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  cards.forEach(card => {
    const visible = filter === 'All' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !visible);
  });
}));
