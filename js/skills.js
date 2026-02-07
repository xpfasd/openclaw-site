// OpenClaw Skills Hub - Skills List Page
document.addEventListener('DOMContentLoaded', () => {
  initSkillsPage();
});

function initSkillsPage() {
  const grid = document.getElementById('skills-grid');
  const searchInput = document.getElementById('skill-search');
  const categoryFilter = document.getElementById('category-filter');
  const totalSkills = document.getElementById('total-skills');
  
  if (!grid) return;
  
  const allSkills = SITE_DATA.getAllSkills();
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
    grid.innerHTML = skills.map(skill => `
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
  
  renderSkills(allSkills);
  
  // Search & Filter
  function filterSkills() {
    const query = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || '';
    
    const filtered = allSkills.filter(skill => {
      const matchSearch = skill.name.toLowerCase().includes(query) || 
                          skill.description.toLowerCase().includes(query);
      const matchCategory = !category || skill.category === category;
      return matchSearch && matchCategory;
    });
    
    renderSkills(filtered);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', filterSkills);
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterSkills);
  }
}

// Export
window.initSkillsPage = initSkillsPage;
