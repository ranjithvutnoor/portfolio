(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const base = body.dataset.base || '.';
  const email = 'ranjithvutnoor@gmail.com';

  const safeGet = (key) => {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  };

  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) { /* no-op */ }
  };

  const preferredTheme = () => {
    const stored = safeGet('portfolio-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.querySelector('[data-theme-icon]').innerHTML = theme === 'dark'
        ? '<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.42 1.42M16.94 16.94l1.42 1.42M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42"/><circle cx="12" cy="12" r="4"/>'
        : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>';
    }
  };

  applyTheme(preferredTheme());

  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    safeSet('portfolio-theme', next);
  });

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');

  const updateScrollUI = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('is-scrolled', y > 10);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
    }
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');

  const closeMobileMenu = () => {
    if (!mobilePanel || !menuButton) return;
    mobilePanel.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', () => {
    const open = !mobilePanel?.classList.contains('is-open');
    mobilePanel?.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  mobilePanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMobileMenu();
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const filters = document.querySelectorAll('[data-project-filter]');
  const projects = document.querySelectorAll('[data-project-category]');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.projectFilter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projects.forEach((project) => {
        const categories = (project.dataset.projectCategory || '').split(' ');
        project.hidden = filter !== 'all' && !categories.includes(filter);
      });
    });
  });

  let toastTimer;
  const toast = document.querySelector('[data-toast]');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard.');
      } catch (_) {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  const overlay = document.querySelector('[data-command-overlay]');
  const dialog = document.querySelector('[data-command-dialog]');
  const searchInput = document.querySelector('[data-command-input]');
  const results = document.querySelector('[data-command-results]');
  let lastFocused = null;
  let selectedIndex = 0;

  const commands = [
    { label: 'Home', meta: 'Navigate', href: `${base}/index.html` },
    { label: 'Selected work', meta: 'Navigate', href: `${base}/index.html#work` },
    { label: 'Experience', meta: 'Navigate', href: `${base}/index.html#experience` },
    { label: 'Expertise', meta: 'Navigate', href: `${base}/index.html#expertise` },
    { label: 'Writing & notes', meta: 'Navigate', href: `${base}/writing.html` },
    { label: 'Enterprise RAG case study', meta: 'Case study', href: `${base}/case-studies/enterprise-rag.html` },
    { label: 'CUDA + MSCRED thesis', meta: 'Case study', href: `${base}/case-studies/cuda-mscred.html` },
    { label: 'NVIDIA Nemotron challenge', meta: 'Case study', href: `${base}/case-studies/nemotron.html` },
    { label: 'EvalStudio', meta: 'Case study', href: `${base}/case-studies/evalstudio.html` },
    { label: 'Download résumé', meta: 'PDF', href: `${base}/assets/docs/Ranjith_Vutnoor_Resume.pdf`, external: true },
    { label: 'GitHub profile', meta: 'External', href: 'https://github.com/ranjithvutnoor', external: true },
    { label: 'LinkedIn profile', meta: 'External', href: 'https://www.linkedin.com/in/ranjithvutnoor/', external: true },
    { label: 'Kaggle profile', meta: 'External', href: 'https://www.kaggle.com/ranjithvutnoor', external: true },
    { label: 'LeetCode profile', meta: 'External', href: 'https://leetcode.com/u/ranjithvutnoor/', external: true },
    { label: 'Copy email address', meta: 'Action', action: 'copy-email' }
  ];

  const filteredCommands = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    return commands.filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(query));
  };

  const executeCommand = (command) => {
    if (!command) return;
    if (command.action === 'copy-email') {
      navigator.clipboard?.writeText(email)
        .then(() => showToast('Email copied to clipboard.'))
        .catch(() => { window.location.href = `mailto:${email}`; });
      closeCommandPalette();
      return;
    }
    if (command.href) {
      if (command.external && /^https?:/.test(command.href)) {
        window.open(command.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = command.href;
      }
      closeCommandPalette();
    }
  };

  const renderCommands = () => {
    if (!results) return;
    const items = filteredCommands();
    selectedIndex = Math.max(0, Math.min(selectedIndex, items.length - 1));
    results.innerHTML = '';

    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'command-item';
      empty.textContent = 'No matching destinations';
      results.appendChild(empty);
      return;
    }

    items.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `command-item${index === selectedIndex ? ' is-selected' : ''}`;
      button.innerHTML = `<span>${item.label}</span><small>${item.meta}</small>`;
      button.addEventListener('mouseenter', () => {
        selectedIndex = index;
        renderCommands();
      });
      button.addEventListener('click', () => executeCommand(item));
      results.appendChild(button);
    });
  };

  const openCommandPalette = () => {
    if (!overlay) return;
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    selectedIndex = 0;
    if (searchInput) searchInput.value = '';
    renderCommands();
    window.setTimeout(() => searchInput?.focus(), 20);
  };

  const closeCommandPalette = () => {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  document.querySelectorAll('[data-command-trigger]').forEach((button) => {
    button.addEventListener('click', openCommandPalette);
  });

  searchInput?.addEventListener('input', () => {
    selectedIndex = 0;
    renderCommands();
  });

  overlay?.addEventListener('mousedown', (event) => {
    if (event.target === overlay) closeCommandPalette();
  });

  dialog?.addEventListener('mousedown', (event) => event.stopPropagation());

  document.addEventListener('keydown', (event) => {
    const metaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    if (metaK) {
      event.preventDefault();
      overlay?.classList.contains('is-open') ? closeCommandPalette() : openCommandPalette();
      return;
    }

    if (!overlay?.classList.contains('is-open')) return;
    const items = filteredCommands();

    if (event.key === 'Escape') {
      event.preventDefault();
      closeCommandPalette();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
      renderCommands();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = Math.max(0, selectedIndex - 1);
      renderCommands();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      executeCommand(items[selectedIndex]);
    } else if (event.key === 'Tab') {
      const focusable = dialog?.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
