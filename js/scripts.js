(() => {
  const links = [...document.querySelectorAll('.main-nav a')];
  const sections = links
    .filter((link) => link.getAttribute('href').startsWith('#'))
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setCurrentLink = (id) => {
    links.forEach((link) => {
      const current = link.getAttribute('href') === `#${id}`;
      if (current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) setCurrentLink(active.target.id);
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }
})();
