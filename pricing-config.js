// PRICING CONFIGURATION
// Edit this file to update your pricing plans

window.PRICING_CONFIG = {
  plans: [
    {
      id: 'hustle-starter',
      name: 'The Hustle Starter',
      price: '$300',
      subtitle: 'For when you\'re just getting started but want to look legit from day one.',
      deliveryTime: '3–5 business days',
      gradient: 'from-green-900/30 to-black',
      border: 'border-green-500/30',
      hoverBorder: 'hover:border-green-400/50',
      iconColor: 'text-green-400',
      buttonGradient: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      buttonText: 'Start Hustling',
      features: [
        'Custom branded logo',
        'Up to 3 pages (Home, About, Contact, etc.)',
        'Mobile-responsive design',
        'Click-to-message & email buttons',
        'Basic contact form + social media links',
        '1 round of revisions'
      ],
      perfectFor: 'freelancers, small startups, and new brands who need a clean, professional presence fast'
    },
    {
      id: 'boss-move',
      name: 'The Boss Move',
      price: '$700',
      subtitle: 'For serious hustlers ready to level up with structure, flow, and functionality.',
      deliveryTime: '5–7 business days',
      gradient: 'from-purple-900/50 to-black',
      border: 'border-purple-400',
      hoverBorder: '',
      iconColor: 'text-purple-400',
      buttonGradient: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      buttonText: 'Make Boss Moves',
      popular: true,
      features: [
        'Everything in Hustle Starter',
        'Up to 6 total pages',
        'Built-in search bar + category filters',
        'Enhanced contact form',
        'Custom icons & buttons',
        'Interactive design features',
        '3 rounds of revisions',
        'Priority build queue',
        'Walkthrough video showing you how to manage your site'
      ],
      perfectFor: 'small businesses, agencies, or personal brands ready to scale their online presence'
    },
    {
      id: 'empire-build',
      name: 'The Empire Build',
      price: '$1,500+',
      subtitle: 'For the visionaries building something bigger — full flexibility, total customization.',
      deliveryTime: '7–14 business days',
      gradient: 'from-yellow-900/50 to-black',
      border: 'border-yellow-500/30',
      hoverBorder: 'hover:border-yellow-400/50',
      iconColor: 'text-yellow-400',
      buttonGradient: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black',
      buttonText: 'Build Empire',
      features: [
        'Everything in Boss Move',
        'Up to 10+ fully custom pages',
        'Custom domain setup (1st year included)',
        'E-commerce or booking system integration',
        'Payment & newsletter systems',
        'Advanced forms and automations',
        'Performance optimization',
        'Unlimited revisions',
        '30 days post-launch support'
      ],
      perfectFor: 'brands, e-commerce stores, and organizations ready to launch a complete digital empire'
    }
  ],
  
  addons: {
    functionality: [
      { name: 'Extra Page', price: '$30 each' },
      { name: 'Custom Forms', price: '$40' },
      { name: 'Live Chat Integration', price: '$25' },
      { name: 'Booking Calendar', price: '$50' },
      { name: 'E-commerce Add-On', price: '$80' },
      { name: 'Product Upload & Setup', price: '$3 per product' },
      { name: 'Digital Downloads Setup', price: '$50' }
    ],
    design: [
      { name: 'Animated Sections', price: '$25' },
      { name: 'Custom Icons/Illustrations', price: '$20+' },
      { name: 'Homepage Redesign', price: '$70' }
    ],
    hosting: [
      { name: 'Domain Connection', price: '$20' },
      { name: 'Custom Email Setup', price: '$35' },
      { name: 'Monthly Maintenance', price: '$40/month' }
    ],
    marketing: [
      { name: 'Email Newsletter Setup', price: '$40' }
    ]
  }
};
