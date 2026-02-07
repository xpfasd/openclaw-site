// OpenClaw Skills Hub - Data Module
// 自动从GitHub加载数据

const SITE_DATA = {
  site: {
    name: "OpenClaw Skills Hub",
    url: "https://xpfasd.github.io/openclaw-site",
    repo: "https://github.com/xpfasd/openclaw-site"
  },
  stats: {
    totalSkills: 53,
    totalDocs: 617
  },
  categories: [
    { id: "ai-ml", name: "AI & 机器学习", icon: "🤖", skills: ["nano-banana-pro", "gemini", "coding-agent"] },
    { id: "media", name: "媒体处理", icon: "🎨", skills: ["canvas", "openai-image-gen", "openai-whisper", "video-frames"] },
    { id: "productivity", name: "效率工具", icon: "⚡", skills: ["notion", "obsidian", "apple-notes", "things-mac"] },
    { id: "communication", name: "通讯社交", icon: "💬", skills: ["discord", "slack", "imsg", "bird"] },
    { id: "development", name: "开发工具", icon: "💻", skills: ["github", "tmux", "skill-creator"] },
    { id: "multimedia", name: "多媒体娱乐", icon: "🎵", skills: ["spotify-player", "songsee", "gifgrep"] },
    { id: "iot", name: "智能家居", icon: "🏠", skills: ["openhue", "goplaces"] },
    { id: "utilities", name: "实用工具", icon: "🔧", skills: ["weather", "healthcheck", "summarize"] }
  ],
  // Skills descriptions (from actual SKILL.md files)
  skills: {
    "coding-agent": {
      name: "Coding Agent",
      icon: "💻",
      description: "Run Codex CLI, Claude Code, OpenCode via background process",
      category: "ai-ml",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/coding-agent/",
      usage: "Use for programmatic control of coding agents",
      examples: [
        "Run Claude Code in background for automated coding tasks",
        "Execute code reviews programmatically",
        "Control OpenCode CLI for development workflows"
      ]
    },
    "gemini": {
      name: "Gemini CLI",
      icon: "✨",
      description: "Gemini CLI for one-shot Q&A, summaries, and generation",
      category: "ai-ml",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/gemini/",
      usage: "Quick Q&A and content generation with Gemini"
    },
    "nano-banana-pro": {
      name: "Nano Banana Pro",
      icon: "🍌",
      description: "Advanced AI prompts and generation tools",
      category: "ai-ml",
      location: "~/.config/nano-banana-pro/"
    },
    "canvas": {
      name: "Canvas",
      icon: "🎨",
      description: "Control node canvases (present/hide/navigate/eval/snapshot)",
      category: "media",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/canvas/"
    },
    "openai-image-gen": {
      name: "OpenAI Image Gen",
      icon: "🖼️",
      description: "Generate images using OpenAI's image generation API",
      category: "media",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/openai-image-gen/"
    },
    "openai-whisper": {
      name: "OpenAI Whisper",
      icon: "🎙️",
      description: "Speech-to-text transcription using Whisper",
      category: "media",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/openai-whisper/"
    },
    "discord": {
      name: "Discord",
      icon: "💬",
      description: "Send messages and manage Discord channels",
      category: "communication",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/discord/"
    },
    "slack": {
      name: "Slack",
      icon: "📱",
      description: "Send messages to Slack channels",
      category: "communication",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/slack/"
    },
    "github": {
      name: "GitHub",
      icon: "🐙",
      description: "Interact with GitHub using gh CLI",
      category: "development",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/github/"
    },
    "weather": {
      name: "Weather",
      icon: "🌤️",
      description: "Get current weather and forecasts",
      category: "utilities",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/weather/"
    },
    "healthcheck": {
      name: "Healthcheck",
      icon: "🏥",
      description: "Host security hardening and risk-tolerance configuration",
      category: "utilities",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/healthcheck/"
    },
    "summarize": {
      name: "Summarize",
      icon: "📝",
      description: "Summarize text content",
      category: "utilities",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/summarize/"
    },
    "notion": {
      name: "Notion",
      icon: "📒",
      description: "Read and write to Notion pages",
      category: "productivity",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/notion/"
    },
    "obsidian": {
      name: "Obsidian",
      icon: "📔",
      description: "Read and manage Obsidian vault",
      category: "productivity",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/obsidian/"
    },
    "spotify-player": {
      name: "Spotify Player",
      icon: "🎵",
      description: "Control Spotify playback",
      category: "multimedia",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/spotify-player/"
    },
    "video-frames": {
      name: "Video Frames",
      icon: "🎬",
      description: "Extract frames from video files",
      category: "media",
      location: "/opt/homebrew/lib/node_modules/openclaw/skills/video-frames/"
    }
  },
  
  // Helper functions
  getSkill(skillId) {
    return this.skills[skillId] || {
      name: skillId,
      icon: "📦",
      description: "OpenClaw Skill",
      category: "utilities"
    };
  },
  
  getCategory(categoryId) {
    return this.categories.find(c => c.id === categoryId);
  },
  
  getAllSkills() {
    return Object.entries(this.skills).map(([id, data]) => ({
      id,
      ...data
    }));
  },
  
  getSkillsByCategory(categoryId) {
    return this.getAllSkills().filter(s => s.category === categoryId);
  }
};

// Export for use in other scripts
window.SITE_DATA = SITE_DATA;
