// OpenClaw Skills Hub - Categories Page
document.addEventListener('DOMContentLoaded', () => {
  initCategoriesPage();
});

function initCategoriesPage() {
  const list = document.getElementById('categories-list');
  
  if (!list) return;
  
  list.innerHTML = SITE_DATA.categories.map(cat => `
    <div class="category-detail" id="${cat.id}">
      <div class="category-header">
        <span class="category-icon">${cat.icon}</span>
        <h2>${cat.name}</h2>
        <span class="category-count">${cat.skills.length} Skills</span>
      </div>
      <div class="category-skills">
        ${cat.skills.map(skillId => {
          const skill = SITE_DATA.getSkill(skillId);
          return `
            <a href="/skills/${skillId}/" class="category-skill-link">
              ${skill.icon} ${skill.name}
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

// Export
window.initCategoriesPage = initCategoriesPage;
