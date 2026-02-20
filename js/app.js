// OpenClaw Skills Hub - Main App
document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
  initSearch();
  initSkillsPage();
});

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  // Check URL for search query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery) {
    searchInput.value = searchQuery;
    // Will be handled by initSkillsPage if on skills page
  }

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });

  // Also search on input with debounce
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (e.target.value.length >= 2) {
        performSearch(e.target.value);
      }
    }, 300);
  });
}

function performSearch(query) {
  if (!query || query.length < 2) return;
  
  const results = SITE_DATA.getAllSkills().filter(skill => {
    const q = query.toLowerCase();
    return skill.name.toLowerCase().includes(q) || 
           skill.description.toLowerCase().includes(q) ||
           skill.category.toLowerCase().includes(q);
  });

  if (results.length > 0) {
    // Check if we're on skills page
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      filterSkills(query);
    } else {
      window.location.href = `/skills/?search=${encodeURIComponent(query)}`;
    }
  } else {
    alert(`No skills found for "${query}"`);
  }
}

// Skills page functionality
function initSkillsPage() {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;
  
  // Get filter elements
  const searchInput = document.getElementById('skill-search');
  const categoryFilter = document.getElementById('category-filter');
  
  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterSkills(e.target.value, categoryFilter?.value);
    });
  }
  
  // Category filter handler
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      filterSkills(searchInput?.value, e.target.value);
    });
  }
  
  // Check URL params for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  const categoryQuery = urlParams.get('category');
  
  if (searchQuery && searchInput) {
    searchInput.value = searchQuery;
  }
  if (categoryQuery && categoryFilter) {
    categoryFilter.value = categoryQuery;
  }
  
  // Apply initial filters
  filterSkills(searchQuery, categoryQuery);
}

function filterSkills(query, category) {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;
  
  const cards = skillsGrid.querySelectorAll('.skill-card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const name = card.dataset.name || '';
    const desc = card.dataset.description || '';
    const cat = card.dataset.category || '';
    
    const q = (query || '').toLowerCase();
    const matchesQuery = !q || 
      name.toLowerCase().includes(q) || 
      desc.toLowerCase().includes(q);
    
    const matchesCategory = !category || cat === category;
    
    if (matchesQuery && matchesCategory) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update results count
  const resultsInfo = document.getElementById('results-info');
  if (resultsInfo) {
    resultsInfo.textContent = `Showing ${visibleCount} skills`;
  }
}

// Initialize Home Page
function initHomePage() {
  const grid = document.getElementById('categories-grid');
  const featured = document.getElementById('featured-skills');
  const updates = document.getElementById('updates-list');
  
  if (!grid) return;
  
  // Render Categories with enhanced info
  grid.innerHTML = SITE_DATA.categories.map(cat => `
    <a href="/categories/#${cat.id}" class="category-card">
      <div class="category-icon">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.skills.length} skills</p>
      <span class="category-count">${cat.skills.length} Skills</span>
    </a>
  `).join('');
  
  // Render Featured Skills - select most useful ones
  const featuredIds = ['github', 'weather', 'discord', 'notion', 'spotify-player', 'canvas', 'healthcheck', 'gemini'];
  const featuredSkills = featuredIds
    .map(id => SITE_DATA.getSkill(id))
    .filter(s => s);
  
  if (featured) {
    featured.innerHTML = featuredSkills.map(skill => `
      <a href="/skills/${skill.id}/" class="skill-card">
        <div class="skill-card-header">
          <span class="skill-icon">${skill.icon}</span>
          <h3>${skill.name}</h3>
        </div>
        <p>${skill.description}</p>
        <div class="skill-tags">
          <span class="tag">${SITE_DATA.getCategory(skill.category)?.name || skill.category}</span>
        </div>
      </a>
    `).join('');
  }
  
  // Render Recent Updates
  if (updates) {
    updates.innerHTML = [
      { date: '2026-02-15', title: 'New AI Skills', desc: 'nano-banana-pro advanced AI prompts tool' },
      { date: '2026-02-15', title: 'Multilingual Support', desc: '5 languages now supported' },
      { date: '2026-02-14', title: 'Site Launch', desc: 'OpenClaw Skills Hub released' }
    ].map(update => `
      <div class="update-item">
        <div class="update-date">${update.date}</div>
        <div class="update-content">
          <h4>${update.title}</h4>
          <p>${update.desc}</p>
        </div>
      </div>
    `).join('');
  }
  
  // Update Stats
  const skillCount = document.getElementById('skill-count');
  const docCount = document.getElementById('doc-count');
  const lastUpdated = document.getElementById('last-updated');
  
  if (skillCount) skillCount.textContent = Object.keys(SITE_DATA.skills).length;
  if (docCount) docCount.textContent = SITE_DATA.stats.totalDocs || 617;
  if (lastUpdated) lastUpdated.textContent = new Date().toLocaleDateString();
}

// Utility: Check if current page is home
function isHomePage() {
  return window.location.pathname === '/' || 
         window.location.pathname === '/index.html';
}

// Export functions
window.initHomePage = initHomePage;
window.initSearch = initSearch;
window.initSkillsPage = initSkillsPage;
window.performSearch = performSearch;
window.filterSkills = filterSkills;
window.SITE_DATA = SITE_DATA;
