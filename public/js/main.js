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
// Allow closing modal by clicking outside the modal or pressing Escape
const modalBg = document.getElementById('modalBg');
if (modalBg) {
  modalBg.addEventListener('click', function(e) {
    if (e.target === modalBg) closeModal();
  });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
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
// Recipe modal logic for World Recipes site
function showRecipeModal(recipe) {
  let modal = document.getElementById('recipeModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'recipeModal';
    modal.className = 'modal-bg active';
    modal.innerHTML = `
      <div class="modal recipe-modal">
        <button class="close-btn" onclick="closeRecipeModal()">&times;</button>
        <h3 id="modalRecipeTitle"></h3>
        <img id="modalRecipeImg" class="recipe-modal-img" src="" alt="Recipe Image" />
        <div class="recipe-modal-cuisine"></div>
        <div class="recipe-modal-ingredients"></div>
        <div class="recipe-modal-steps"></div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.classList.add('active');
  }
  document.getElementById('modalRecipeTitle').textContent = recipe.name;
  document.getElementById('modalRecipeImg').src = recipe.image;
  document.getElementById('modalRecipeImg').alt = recipe.name;
  document.querySelector('.recipe-modal-cuisine').textContent = `Cuisine: ${recipe.cuisine}`;
  document.querySelector('.recipe-modal-ingredients').innerHTML = '<b>Ingredients:</b><ul>' + recipe.ingredients.map(i => `<li>${i}</li>`).join('') + '</ul>';
  document.querySelector('.recipe-modal-steps').innerHTML = '<b>Steps:</b><ol>' + recipe.steps.map(s => `<li>${s}</li>`).join('') + '</ol>';
}
function closeRecipeModal() {
  const modal = document.getElementById('recipeModal');
  if (modal) modal.classList.remove('active');
}
// Attach event listeners to recipe cards if on homepage
window.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('recipes-list');
  if (list) {
    fetch('recipes.json')
      .then(response => response.json())
      .then(data => {
        list.innerHTML = data.map((recipe, idx) => `
          <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img" />
            <div class="recipe-info">
              <div class="recipe-name">${recipe.name}</div>
              <div class="recipe-cuisine">${recipe.cuisine}</div>
              <button class="view-recipe-btn" data-idx="${idx}">View Recipe</button>
            </div>
          </div>
        `).join('');
        // Add click listeners
        list.querySelectorAll('.view-recipe-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            showRecipeModal(data[idx]);
          });
        });
      });
  }
});
// Allow closing recipe modal by clicking outside or pressing Escape
window.addEventListener('click', function(e) {
  const modal = document.getElementById('recipeModal');
  if (modal && modal.classList.contains('active') && e.target === modal) closeRecipeModal();
});
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('recipeModal');
  if (modal && modal.classList.contains('active') && e.key === 'Escape') closeRecipeModal();
});

// Add Supabase client via CDN in HTML before this script
const SUPABASE_URL = 'https://waduvfzgoaslskbnztie.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZHV2Znpnb2FzbHNrYm56dGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MjcxOTcsImV4cCI6MjA2NzAwMzE5N30.fBPaM2pNKnIo3KaOVgGiMhoYexs_i7ctVF2X2QGrk-c';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other scripts if needed
window.supabaseClient = supabase; 