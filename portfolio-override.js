(function() {
  if (!window.PORTFOLIO_CONFIG) {
    console.warn('Portfolio config not found');
    return;
  }

  function updatePortfolioSection() {
    const portfolioContainer = document.querySelector('.grid.sm\\:grid-cols-2.lg\\:grid-cols-3');

    if (!portfolioContainer) {
      setTimeout(updatePortfolioSection, 100);
      return;
    }

    const existingItems = portfolioContainer.querySelectorAll('.bg-gradient-to-br.from-gray-900\\/50');
    if (existingItems.length === 0) {
      setTimeout(updatePortfolioSection, 100);
      return;
    }

    portfolioContainer.innerHTML = '';

    window.PORTFOLIO_CONFIG.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'bg-gradient-to-br from-gray-900/50 to-black border border-gray-500/30 rounded-xl p-6 sm:p-8 hover:border-green-400/50 transition-all duration-300 group';

      card.innerHTML = `
        <div class="mb-6">
          <h3 class="text-xl sm:text-2xl font-bold mb-3 text-green-400">${item.title}</h3>
          <p class="text-gray-300 mb-4 leading-relaxed">${item.description}</p>
        </div>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group-hover:scale-105 transform duration-300">
          <span>View Live Site</span>
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;

      portfolioContainer.appendChild(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePortfolioSection);
  } else {
    updatePortfolioSection();
  }
})();
