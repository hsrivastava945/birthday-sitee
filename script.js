/* =========================================================
   CONFIG — edit everything in this block to personalize
========================================================= */
const CONFIG = {
  herName: "My Bacchhuuu, Anushka Ji",           // shown big on the greeting screen
  peekName: "To My Bachuu and My person",      // small text peeking out of the envelope

  greeting: `I wrote this instead of just saying it out loud, because some
    things deserve to be kept somewhere you can come back to. Scroll slow —
    there's a song, some pictures, a small garden, and a letter waiting at
    the end.`,

  // Add photos to assets/photos/ and list them here.
  // If a file is missing, a soft placeholder frame is shown instead — safe to launch before photos are ready.
  photos: [
    { src: "assets/photos/sexy.jpeg", caption: "My Bachuuu" },
    { src: "assets/photos/hottie.jpeg", caption: "My Cutiee" },
    { src: "assets/photos/diva.jpeg", caption: "Uss" },
    { src: "assets/photos/queen.jpeg", caption: "Forever Uss" },
  ],

  // Each flower holds one short note. Add or remove freely.
  notes: [
    "You make ordinary days feel like plans worth keeping.",
    "I like you in the quiet moments most of all.",
    "Still my favourite person to tell small things to.",
    "Thank you for staying, even on the hard days.",
    "You're the calm part of my week.",
    "I noticed the little thing you did. I always do.",
  ],

  letterParagraphs: [
  "Happy Birthday, bacchuu ❤️🎂",
  "I wish I could be next to you right now, hold you close, see that beautiful smile of yours, and make this day as special as you deserve. I hate that distance keeps us apart, but no amount of distance could ever change how much you mean to me.I love when you get ragebaited 🥺❤️",
  "You're one of the most beautiful parts of my life, and I'm so grateful that I have you. I hope this new year of your life brings you all the happiness, love, success, and little moments you've been wishing for. And I hope I get to be there for as many of those moments as possible.🥺❤️",
  "If I could wish for one thing today, it would be to see you in person and give you the longest hug ever. Until then, remember that somewhere, someone is smiling just because you exist. ❤️",
  "Happy Birthday, baby. I love you so much. 🫶🏻❤️",
],
signature: "From Honeybun",
};

/* =========================================================
   ENVELOPE INTRO
========================================================= */
const envelopeScreen = document.getElementById('envelope-screen');
const envelope = document.getElementById('envelope');
const seal = document.getElementById('seal');
const site = document.getElementById('site');

function openEnvelope(){
  if (envelope.classList.contains('opening')) return;
  envelope.classList.add('opening');
  envelopeScreen.classList.add('closing');
  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    site.classList.remove('hidden');
    document.body.style.overflow = 'auto';
  }, 1150);
}
seal.addEventListener('click', openEnvelope);
document.body.style.overflow = 'hidden';

/* =========================================================
   PERSONALIZE TEXT
========================================================= */
document.getElementById('peekName').textContent = CONFIG.peekName;
document.getElementById('greetName').textContent = CONFIG.herName;
document.getElementById('greetBody').textContent = CONFIG.greeting.replace(/\s+/g, ' ').trim();
document.getElementById('signature').textContent = CONFIG.signature;

const letterBody = document.getElementById('letterBody');
CONFIG.letterParagraphs.forEach((text, i) => {
  const p = document.createElement('p');
  if (i === 0) p.className = 'drop-cap';
  p.textContent = text;
  letterBody.appendChild(p);
});

/* =========================================================
   GALLERY
========================================================= */
const album = document.getElementById('album');
CONFIG.photos.forEach((photo, i) => {
  const card = document.createElement('div');
  card.className = 'photo-card';
  card.style.setProperty('--r', `${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg`);

  const frame = document.createElement('div');
  frame.className = 'frame';

  const img = document.createElement('img');
  img.src = photo.src;
  img.alt = photo.caption || '';
  img.loading = 'lazy';
  img.onerror = () => {
    frame.innerHTML = `<div class="photo-placeholder">add<br>${photo.src.split('/').pop()}</div>`;
  };
  frame.appendChild(img);

  const caption = document.createElement('p');
  caption.className = 'photo-caption';
  caption.textContent = photo.caption || '';

  card.appendChild(frame);
  card.appendChild(caption);
  album.appendChild(card);
});

/* =========================================================
   FLOWER GARDEN
========================================================= */
const flowerbed = document.getElementById('flowerbed');
const petalColors = ['#F2C9D6', '#B8935A', '#5C1A2E', '#D8BD8C'];

function flowerSVG(colorIndex){
  const petal = petalColors[colorIndex % petalColors.length];
  return `
  <svg viewBox="0 0 60 70" fill="none">
    <line x1="30" y1="34" x2="30" y2="66" stroke="#7a8c5c" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 46 C24 50 18 50 16 56" stroke="#7a8c5c" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g transform="translate(30,20)">
      <ellipse cx="0" cy="-11" rx="7" ry="11" fill="${petal}" opacity="0.9"/>
      <ellipse cx="0" cy="11" rx="7" ry="11" fill="${petal}" opacity="0.9"/>
      <ellipse cx="-11" cy="0" rx="11" ry="7" fill="${petal}" opacity="0.9"/>
      <ellipse cx="11" cy="0" rx="11" ry="7" fill="${petal}" opacity="0.9"/>
      <circle cx="0" cy="0" r="6" fill="#B8935A"/>
    </g>
  </svg>`;
}

const modalBackdrop = document.getElementById('modalBackdrop');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');

function openModal(text){
  modalText.textContent = text;
  modalBackdrop.classList.add('open');
}
function closeModal(){ modalBackdrop.classList.remove('open'); }
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

CONFIG.notes.forEach((note, i) => {
  const btn = document.createElement('button');
  btn.className = 'flower-btn';
  btn.innerHTML = flowerSVG(i) + `<span class="flower-label">note ${i + 1}</span>`;
  btn.addEventListener('click', () => openModal(note));
  flowerbed.appendChild(btn);
});

/* =========================================================
   SONG TOGGLE
========================================================= */
const songToggle = document.getElementById('songToggle');
const songLabel = document.getElementById('songLabel');
const bgSong = document.getElementById('bgSong');
let playing = false;

songToggle.addEventListener('click', () => {
  if (!playing) {
    bgSong.play().catch(() => {
      songLabel.textContent = 'add a song file first';
      return;
    });
    playing = true;
    songToggle.classList.add('playing');
    songLabel.textContent = 'playing our song';
  } else {
    bgSong.pause();
    playing = false;
    songToggle.classList.remove('playing');
    songLabel.textContent = 'play our song';
  }
});

/* =========================================================
   SCROLL THREAD + FADE-INS
========================================================= */
const threadFill = document.getElementById('threadFill');
function updateThread(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  threadFill.style.height = `${Math.min(100, Math.max(0, pct))}%`;
}
window.addEventListener('scroll', updateThread, { passive: true });
updateThread();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-target, .photo-card').forEach(el => observer.observe(el));
