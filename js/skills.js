// OpenClaw Skills Hub - Skills List Page
document.addEventListener('DOMContentLoaded', () => {
  initSkillsPage();
});

function initSkillsPage() {
  const grid = document.getElementById('skills-grid');
  const searchInput = document.getElementById('skill-search');
  const clearBtn = document.getElementById('clear-search');
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const totalSkills = document.getElementById('total-skills');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const viewBtns = document.querySelectorAll('.view-btn');
  
  if (!grid) return;
  
  let allSkills = SITE_DATA.getAllSkills();
  let currentView = 'grid';
  
  totalSkills.textContent = allSkills.length;
  
  // Populate category filter
  if (categoryFilter) {
    categoryFilter.innerHTML = `
      <option value="">所有分类</option>
      ${SITE_DATA.categories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
      ).join('')}
    `;
  }
  
  // Render all skills
  function renderSkills(skills) {
    if (skills.length === 0) {
      grid.innerHTML = '';
      grid.style.display = 'grid';
      emptyState.style.display = 'block';
      resultsCount.textContent = '未找到匹配的技能';
      return;
    }
    
    emptyState.style.display = 'none';
    resultsCount.textContent = `显示 ${skills.length} 个技能`;
    
    grid.innerHTML = skills.map((skill, index) => `
      <a href="/skills/${skill.id}/" class="skill-card" style="animation-delay: ${Math.min(index * 0.05, 0.3)}s">
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
  
  // Sort skills
  function sortSkills(skills, sortBy) {
    const sorted = [...skills];
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
        break;
      case 'category':
        sorted.sort((a, b) => {
          const catA = SITE_DATA.getCategory(a.category)?.name || '';
          const catB = SITE_DATA.getCategory(b.category)?.name || '';
          return catA.localeCompare(catB, 'zh-CN');
        });
        break;
      default:
        break;
    }
    return sorted;
  }
  
  // Filter and render
  function filterAndRender() {
    const query = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || '';
    const sortBy = sortFilter?.value || 'name';
    
    // Show/hide clear button
    if (clearBtn) {
      clearBtn.style.display = query ? 'flex' : 'none';
    }
    
    const filtered = allSkills.filter(skill => {
      const matchSearch = !query || 
                          skill.name.toLowerCase().includes(query) || 
                          skill.description.toLowerCase().includes(query);
      const matchCategory = !category || skill.category === category;
      return matchSearch && matchCategory;
    });
    
    const sorted = sortSkills(filtered, sortBy);
    renderSkills(sorted);
  }
  
  // View toggle
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      grid.classList.toggle('list-view', currentView === 'list');
    });
  });
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', filterAndRender);
  }
  
  // Clear search
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterAndRender();
      searchInput.focus();
    });
  }
  
  // Filters
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterAndRender);
  }
  
  if (sortFilter) {
    sortFilter.addEventListener('change', filterAndRender);
  }
  
  // Initial render
  filterAndRender();
}

// Export
window.initSkillsPage = initSkillsPage;
