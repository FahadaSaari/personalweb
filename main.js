// main.js - extracted from testing.html
// Modal logic
function openModal(service) {
  document.getElementById('modalBg').classList.add('active');
  document.getElementById('modalService').value = service;
  document.getElementById('modalTitle').textContent = service === 'Candy Wall Booth' ? 'Tempah Sesi' : 'Register Interest';
}
function closeModal() {
  document.getElementById('modalBg').classList.remove('active');
}
// Nav active state on scroll
const navLinks = document.querySelectorAll('nav a');
const sections = ['about','services','contact'];
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 80;
  navLinks.forEach((link, i) => {
    const section = document.getElementById(sections[i]);
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
// Hero section interactive hover effect
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', e => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  hero.style.background = `radial-gradient(circle at ${x}px ${y}px, #fbeffb 0%, #fff 100%)`;
});
hero.addEventListener('mouseleave', () => {
  hero.style.background = 'rgba(255,255,255,0.92)';
});
// Animated icons in hero section
const animatedIcons = [
  { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg', alt: 'AI' },
  { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2728.svg', alt: 'Sparkle' },
  { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a1.svg', alt: 'Lightbulb' },
  { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e0.svg', alt: 'Brain' }
];
const iconsContainer = document.querySelector('.animated-icons');
if (iconsContainer) {
  for (let i = 0; i < 7; i++) {
    const icon = document.createElement('img');
    const iconData = animatedIcons[Math.floor(Math.random() * animatedIcons.length)];
    icon.src = iconData.src;
    icon.alt = iconData.alt;
    icon.className = 'animated-icon';
    icon.style.left = (10 + Math.random() * 80) + '%';
    icon.style.top = (10 + Math.random() * 60) + '%';
    icon.style.animationDelay = (Math.random() * 4) + 's';
    iconsContainer.appendChild(icon);
  }
} 