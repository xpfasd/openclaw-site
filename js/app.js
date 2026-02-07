// OpenClaw Skills Hub - Main App
document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
});

// Initialize Home Page
function initHomePage() {
  const grid = document.getElementById('categories-grid');
  const featured = document.getElementById('featured-skills');
  const updates = document.getElementById('updates-list');
  
  if (!grid) return;
  
  // Render Categories
  grid.innerHTML = SITE_DATA.categories.map(cat => `
    <a href="/categories/#${cat.id}" class="category-card">
      <div class="category-icon">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.skills.length} 个相关技能</p>
      <span class="category-count">${cat.skills.length} Skills</span>
    </a>
  `).join('');
  
  // Render Featured Skills (first 8)
  const allSkills = SITE_DATA.getAllSkills();
  if (featured) {
    featured.innerHTML = allSkills.slice(0, 8).map(skill => `
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
      { date: '2026-02-07', title: '新增nano-banana-pro技能', desc: '高级AI提示词和生成工具' },
      { date: '2026-02-07', title: '收集器自动运行', desc: '每30分钟自动收集Skills和Docs' },
      { date: '2026-02-06', title: '网站上线', desc: 'OpenClaw Skills Hub正式发布' }
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
  if (docCount) docCount.textContent = SITE_DATA.stats.totalDocs;
  if (lastUpdated) lastUpdated.textContent = new Date().toLocaleDateString('zh-CN');
}

// Utility: Check if current page is home
function isHomePage() {
  return window.location.pathname === '/' || 
         window.location.pathname === '/index.html';
}

// Export functions
window.initHomePage = initHomePage;
window.SITE_DATA = SITE_DATA;
