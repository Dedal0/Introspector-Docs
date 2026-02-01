// Simple search functionality for Introspector documentation
document.addEventListener('DOMContentLoaded', function() {
  // Create search box
  const searchBox = document.createElement('input');
  searchBox.type = 'text';
  searchBox.placeholder = 'Search docs... (Ctrl+K)';
  searchBox.className = 'search-box';
  searchBox.style.cssText = `
    width: 200px;
    padding: 0.5rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    margin-left: 1rem;
  `;
  
  // Add search box to header
  const headerContent = document.querySelector('.header-content');
  if (headerContent) {
    headerContent.appendChild(searchBox);
  }
  
  // Keyboard shortcut
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchBox.focus();
    }
  });
  
  // Search functionality
  searchBox.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const mainContent = document.querySelector('.main-content');
    const allContent = mainContent.querySelectorAll('h1, h2, h3, h4, p, li, dt, dd');
    
    // Hide/show content based on search
    allContent.forEach(element => {
      if (searchTerm.length === 0) {
        element.style.opacity = '1';
        element.style.background = '';
        return;
      }
      
      const text = element.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        element.style.opacity = '1';
        element.style.background = 'rgba(0, 255, 65, 0.1)';
        element.style.transition = 'background 0.3s ease';
      } else {
        element.style.opacity = '0.3';
        element.style.background = '';
      }
    });
    
    // Highlight search terms in headers
    const headers = mainContent.querySelectorAll('h1, h2, h3, h4');
    headers.forEach(header => {
      const originalText = header.textContent;
      if (originalText.toLowerCase().includes(searchTerm)) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        header.innerHTML = originalText.replace(regex, '<mark style="background: rgba(0, 255, 65, 0.3); color: var(--accent-green);">$1</mark>');
      }
    });
  });
  
  // Add some interactive elements
  const terminalPrompt = document.createElement('div');
  terminalPrompt.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-accent);
    border-radius: 8px;
    padding: 1rem;
    font-family: var(--font-mono);
    color: var(--accent-green);
    font-size: 0.8rem;
    z-index: 1000;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  `;
  terminalPrompt.innerHTML = '$ ready to hack...';
  document.body.appendChild(terminalPrompt);
  
  // Terminal animation
  let terminalMessages = [
    '$ ready to hack...',
    '$ scanning targets...',
    '$ exploiting vulnerabilities...',
    '$ extracting data...',
    '$ covering tracks...',
    '$ mission complete!'
  ];
  
  let messageIndex = 0;
  setInterval(() => {
    terminalPrompt.style.opacity = '0';
    setTimeout(() => {
      messageIndex = (messageIndex + 1) % terminalMessages.length;
      terminalPrompt.innerHTML = terminalMessages[messageIndex];
      terminalPrompt.style.opacity = '0.8';
    }, 500);
  }, 3000);
  
  // Hover effects for cards
  document.querySelectorAll('.card, .hacker-btn').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add copy-to-clipboard for code blocks
  document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      background: var(--accent-green);
      color: var(--bg-primary);
      border: none;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const pre = block.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    pre.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
    });
    
    pre.addEventListener('mouseleave', () => {
      button.style.opacity = '0';
    });
    
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent);
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1000);
    });
  });
});