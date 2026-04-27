// Vercel Web Analytics Initialization
// Inline injection based on @vercel/analytics package

(function() {
  // Initialize the queue
  if (window.va) return;
  window.va = function() {
    (window.vaq = window.vaq || []).push(arguments);
  };

  // Create and inject the analytics script
  const script = document.createElement('script');
  script.src = '/_vercel/insights/script.js';
  script.defer = true;
  script.dataset.sdkn = '@vercel/analytics';
  script.dataset.sdkv = '2.0.1';
  
  script.onerror = function() {
    console.log('[Vercel Web Analytics] Failed to load. Please ensure Web Analytics is enabled in your Vercel project settings.');
  };
  
  document.head.appendChild(script);
})();
