// Keyboard Shortcuts
(function() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  
  if (!searchInput) return;

  // Ctrl/Cmd + K to focus search
  document.addEventListener('keydown', (e) => {
    // Check for Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    
    // Escape to blur search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });

  // Add visual feedback when focused
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.classList.add('search-focused');
  });

  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.classList.remove('search-focused');
  });
})();
