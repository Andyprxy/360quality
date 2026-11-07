(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const header = $('.site-header');
  const nav = $('#site-nav');
  const menuToggle = $('#menu-toggle');
  const toast = $('#toast');
  const contactForm = $('#contact-form');
  const serviceSelect = $('#service');
  const config = window.SITE_CONFIG || {};
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 4600);
  }

  function handleScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
  menuToggle?.addEventListener('click', () => {
    const nowOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', nowOpen);
    menuToggle.setAttribute('aria-expanded', String(nowOpen));
    menuToggle.setAttribute('aria-label', nowOpen ? 'Close menu' : 'Open menu');
  });
  $$('.primary-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (nav?.classList.contains('is-open') && !event.target.closest('.header-shell')) closeMenu();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 960) closeMenu(); });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
    $$('.reveal').forEach(element => revealObserver.observe(element));

    const navLinks = $$('.primary-nav a[href^="#"]');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => link.classList.toggle('is-current', link.hash === `#${id}`));
      });
    }, { threshold: 0.12, rootMargin: '-20% 0px -65% 0px' });
    ['services','approach','standards','about','insights'].forEach(id => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  } else {
    $$('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  function activateService(key, moveFocus = false) {
    const keys = ['iso', 'gap', 'audit', 'stats'];
    if (!keys.includes(key)) return;
    $$('.detail-tab').forEach(tab => {
      const active = tab.dataset.tab === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    $$('.service-tab-panel').forEach(panel => { panel.hidden = panel.dataset.panel !== key; });
  }

  $$('.detail-tab').forEach((tab, index, tabs) => {
    tab.addEventListener('click', () => activateService(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const last = tabs.length - 1;
      const targetIndex = event.key === 'Home' ? 0 : event.key === 'End' ? last : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activateService(tabs[targetIndex].dataset.tab, true);
    });
  });

  $$('[data-show-service], [data-service-link]').forEach(control => {
    control.addEventListener('click', event => {
      const key = control.dataset.showService || control.dataset.serviceLink;
      activateService(key);
      const explorer = $('#service-explorer');
      if (!explorer) return;
      if (control.tagName === 'BUTTON') event.preventDefault();
      // Anchors work on their own but scroll is also needed for card buttons.
      if (control.tagName === 'BUTTON') explorer.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
    });
  });

  $$('[data-service-prefill]').forEach(link => {
    link.addEventListener('click', () => {
      if (serviceSelect) serviceSelect.value = link.dataset.servicePrefill;
    });
  });

  $$('.faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) $$('.faq-list details').forEach(other => { if (other !== detail) other.open = false; });
    });
  });

  const copyrightYear = $('#copyright-year');
  if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());

  // Static-site-safe email handoff: never claim submission without an actual backend.
  const formNote = $('#form-note');
  if (formNote && config.contactEmail) {
    formNote.textContent = 'Your email application will open with the enquiry prefilled. Review and send the email to finish your request. This website does not store form entries.';
  }

  function makeEnquiry(values) {
    return [
      '360 QUALITY SOLUTIONS — CONSULTATION ENQUIRY',
      '',
      `Name: ${values.name}`,
      `Organisation: ${values.company || 'Not provided'}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || 'Not provided'}`,
      `Service: ${values.service}`,
      '',
      'Enquiry details:',
      values.message,
      '',
      'Submitted for preparation by the sender through the website contact form.'
    ].join('\n');
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* Fall back to selection, below. */ }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(helper);
    helper.select();
    let success = false;
    try { success = document.execCommand('copy'); } catch (_) { /* Copy can be blocked. */ }
    helper.remove();
    return success;
  }

  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const f = new FormData(contactForm);
    const values = {
      name: String(f.get('name') || '').trim(),
      company: String(f.get('company') || '').trim(),
      email: String(f.get('email') || '').trim(),
      phone: String(f.get('phone') || '').trim(),
      service: String(f.get('service') || '').trim(),
      message: String(f.get('message') || '').trim()
    };
    const message = makeEnquiry(values);
    const feedback = $('#form-feedback');
    if (!feedback) return;
    feedback.replaceChildren();
    feedback.hidden = false;

    if (config.contactEmail) {
      const subject = encodeURIComponent(`Consultation enquiry — ${values.service} — ${values.name}`);
      const body = encodeURIComponent(message);
      const mailto = `mailto:${encodeURIComponent(config.contactEmail).replace(/%40/g, '@')}?subject=${subject}&body=${body}`;
      const paragraph = document.createElement('p');
      paragraph.textContent = 'Your email application should open with a prepared enquiry. Please press Send there; the website has not submitted it automatically.';
      feedback.appendChild(paragraph);
      const directLink = document.createElement('a');
      directLink.href = mailto;
      directLink.textContent = 'Open the prepared email again';
      feedback.appendChild(directLink);
      window.location.href = mailto;
      showToast('Your enquiry is ready in your email application.');
    } else {
      const paragraph = document.createElement('p');
      paragraph.textContent = 'This is a preview: the company email has not yet been configured, so no enquiry has been sent. You can copy the prepared text below.';
      feedback.appendChild(paragraph);
      const summary = document.createElement('textarea');
      summary.value = message;
      summary.setAttribute('aria-label', 'Prepared enquiry text');
      summary.readOnly = true;
      summary.style.cssText = 'display:block;width:100%;height:120px;padding:10px;margin-top:10px;border:1px solid #c8d9e8;border-radius:8px;background:#fff;color:#1c4567;font:12px/1.6 monospace;resize:vertical';
      feedback.appendChild(summary);
      const copyButton = document.createElement('button');
      copyButton.type = 'button';
      copyButton.textContent = 'Copy enquiry';
      copyButton.addEventListener('click', async () => {
        if (await copyText(message)) showToast('Enquiry copied to clipboard.');
        else { summary.focus(); summary.select(); showToast('Select the text and copy it manually.'); }
      });
      feedback.appendChild(copyButton);
    }
    feedback.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  });
})();
