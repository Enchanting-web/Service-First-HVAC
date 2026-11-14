(function () {
  const forms = document.querySelectorAll('[data-help-search]');
  forms.forEach((form) => {
    const input = form.querySelector('input[type="search"],input[type="text"]');
    if (input) input.setAttribute('aria-label', 'Search Service First Heating & Air help articles');
  });
})();
