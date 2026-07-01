// =========================================================
// AURUM HOUSE — shared interactivity
// =========================================================

// ---- Sticky header on scroll ----
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Mobile menu toggle ----
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  if (!question || !answer) return;
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach((open) => {
      if (open !== item) {
        open.classList.remove('is-open');
        open.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    item.classList.toggle('is-open', !isOpen);
    answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
  });
});

// ---- Gallery lightbox ----
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxArt = lightbox.querySelector('.art-frame');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const sourceArt = item.querySelector('.art-frame');
      const caption = item.querySelector('figcaption')?.textContent || '';
      if (sourceArt && lightboxArt) {
        lightboxArt.innerHTML = sourceArt.innerHTML;
      }
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.classList.add('is-open');
      document.body.classList.add('menu-open');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ---- Booking / contact form validation ----
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  const statusBox = bookingForm.querySelector('.form-status');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    phone: (v) => v.trim().length >= 7 || 'Enter a valid phone number.',
    checkin: (v) => v !== '' || 'Choose a check-in date.',
    checkout: (v) => v !== '' || 'Choose a check-out date.',
    guests: (v) => v !== '' || 'Select the number of guests.',
    roomType: (v) => v !== '' || 'Select a room type.',
  };

  const showFieldError = (field, message) => {
    const wrapper = field.closest('.field');
    const errorEl = wrapper?.querySelector('.error-msg');
    wrapper?.classList.toggle('has-error', !!message);
    if (errorEl) errorEl.textContent = message || '';
  };

  const validateField = (field) => {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    if (result === true) {
      showFieldError(field, '');
      return true;
    }
    showFieldError(field, result);
    return false;
  };

  bookingForm.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.field')?.classList.contains('has-error')) validateField(field);
    });
  });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    bookingForm.querySelectorAll('input, select, textarea').forEach((field) => {
      if (validators[field.name] && !validateField(field)) isValid = false;
    });

    const checkin = bookingForm.querySelector('[name="checkin"]');
    const checkout = bookingForm.querySelector('[name="checkout"]');
    if (checkin?.value && checkout?.value && checkout.value <= checkin.value) {
      showFieldError(checkout, 'Check-out must be after check-in.');
      isValid = false;
    }

    if (!statusBox) return;
    statusBox.classList.remove('ok', 'bad');
    if (isValid) {
      statusBox.textContent = 'Thank you — your request has been received. Our reservations team will confirm by email within 24 hours.';
      statusBox.classList.add('show', 'ok');
      bookingForm.reset();
    } else {
      statusBox.textContent = 'Please correct the highlighted fields and try again.';
      statusBox.classList.add('show', 'bad');
    }
  });
}
