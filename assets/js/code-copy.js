// Code Copy Functionality
(function() {
  'use strict';

  function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      
      // Skip if button already exists
      if (pre.querySelector('.code-copy-btn')) {
        return;
      }
      
      // Create actions container
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'code-actions';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn';
      copyButton.textContent = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Add click handler
      copyButton.addEventListener('click', async () => {
        const code = codeBlock.textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          copyButton.textContent = 'Copied!';
          copyButton.classList.add('copied');
          
          setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
          copyButton.textContent = 'Error';
          
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        }
      });
      
      actionsDiv.appendChild(copyButton);
      pre.appendChild(actionsDiv);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
  } else {
    addCopyButtons();
  }
})();
