(function() {
  // Add CSS to hide pricing until ready
  const style = document.createElement('style');
  style.textContent = `
    .grid.lg\\:grid-cols-3 {
      opacity: 0;
      transition: opacity 0.3s ease-in;
    }
    .grid.lg\\:grid-cols-3.pricing-ready {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  function updatePricingSection() {
    // Only run on pricing page
    if (!window.location.pathname.includes('pricing')) {
      return;
    }

    if (!window.PRICING_CONFIG) {
      console.warn('Pricing config not found');
      setTimeout(updatePricingSection, 50);
      return;
    }

    const pricingGrid = document.querySelector('.grid.lg\\:grid-cols-3');
    if (!pricingGrid) {
      setTimeout(updatePricingSection, 50);
      return;
    }

    // Check if already updated
    if (pricingGrid.dataset.updated === 'true') {
      return;
    }
    pricingGrid.dataset.updated = 'true';

    // Clear existing plans
    pricingGrid.innerHTML = '';

    // Create cards from config
    window.PRICING_CONFIG.plans.forEach((plan) => {
      const card = document.createElement('div');
      card.className = `bg-gradient-to-br ${plan.gradient} border-2 ${plan.border} rounded-xl p-6 sm:p-8 relative transform ${plan.popular ? 'lg:scale-105' : plan.hoverBorder + ' transition-all duration-300'}`;

      let cardHTML = '';

      // Popular badge
      if (plan.popular) {
        cardHTML += `
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              MOST POPULAR
            </span>
          </div>
        `;
      }

      // Header
      cardHTML += `
        <div class="text-center mb-8">
          <h3 class="text-xl sm:text-2xl font-bold mb-2 ${plan.iconColor}">${plan.name}</h3>
          <div class="text-3xl sm:text-4xl font-bold mb-4">${plan.price}</div>
          <p class="text-gray-300 text-sm sm:text-base">${plan.subtitle}</p>
        </div>
      `;

      // Features
      cardHTML += '<ul class="space-y-3 mb-8 text-sm sm:text-base">';
      plan.features.forEach(feature => {
        cardHTML += `
          <li class="flex items-start">
            <svg class="h-4 w-4 sm:h-5 sm:w-5 ${plan.iconColor} mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            ${feature}
          </li>
        `;
      });
      cardHTML += '</ul>';

      // Perfect for section
      if (plan.perfectFor) {
        cardHTML += `
          <div class="mb-6 p-4 bg-black/30 rounded-lg border border-gray-700">
            <p class="text-sm text-gray-300">
              <strong class="${plan.iconColor}">Perfect for:</strong> ${plan.perfectFor}
            </p>
          </div>
        `;
      }

      // Footer
      cardHTML += `
        <div class="text-center">
          <div class="text-sm text-gray-400 mb-4">${plan.deliveryTime}</div>
          <button 
            class="pricing-cta w-full px-6 py-3 bg-gradient-to-r ${plan.buttonGradient} rounded-lg font-semibold transition-all duration-300"
            data-package="${plan.name} - ${plan.price}"
          >
            ${plan.buttonText}
          </button>
        </div>
      `;

      card.innerHTML = cardHTML;
      pricingGrid.appendChild(card);
    });

    // Add click handlers
    document.querySelectorAll('.pricing-cta').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        const pkg = this.dataset.package;
        const encodedPkg = encodeURIComponent(pkg);
        window.location.href = `/contact?package=${encodedPkg}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });

    console.log('✅ Pricing section updated from config');
  }

  // Run on page load and navigation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePricingSection);
  } else {
    updatePricingSection();
  }

  // Watch for route changes (React Router)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      if (window.location.pathname.includes('pricing')) {
        setTimeout(updatePricingSection, 100);
      }
    }
  }, 500);
})();
