// Google Modern Cyber-Dark JavaScript Engine
document.addEventListener('DOMContentLoaded', () => {
  initAppLauncher();
  initCommandPalette();
  init360Hologram();
  initSmoothScroll();
});

// 1. Google 9-dots Waffle Menu
function initAppLauncher() {
  const btn = document.getElementById('waffleBtn');
  const menu = document.getElementById('waffleMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('show');
    }
  });
}

// 2. Google Search / Command Palette (Ctrl + K)
function initCommandPalette() {
  const triggers = document.querySelectorAll('.g-search-trigger, [data-trigger-search]');
  const modal = document.getElementById('paletteModal');
  const input = document.getElementById('paletteInput');
  const list = document.getElementById('paletteList');
  if (!modal || !input) return;

  function openPalette() {
    modal.classList.add('open');
    input.value = '';
    input.focus();
    filterItems('');
  }

  function closePalette() {
    modal.classList.remove('open');
  }

  triggers.forEach(t => t.addEventListener('click', openPalette));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? closePalette() : openPalette();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closePalette();
    }
  });

  input.addEventListener('input', (e) => {
    filterItems(e.target.value.toLowerCase().trim());
  });

  function filterItems(query) {
    if (!list) return;
    const items = list.querySelectorAll('.g-palette-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// 3. 360-Degree Interactive Hologram Face Controller
function init360Hologram() {
  const wrap = document.querySelector('.g-hologram-wrap');
  const card = document.querySelector('.g-3d-card');
  const yawReadout = document.getElementById('yawVal');
  const slider = document.getElementById('yawSlider');
  const autoBtn = document.getElementById('autoSpinBtn');
  const flipBtn = document.getElementById('flipCardBtn');
  if (!card) return;

  let currentYaw = 0;
  let currentPitch = 0;
  let isAutoSpinning = false;
  let autoTimer = null;
  let isDragging = false;
  let startX = 0;
  let startYaw = 0;

  function updateTransform(yaw, pitch = 0) {
    currentYaw = ((yaw % 360) + 360) % 360;
    currentPitch = Math.max(-25, Math.min(25, pitch));
    card.style.transform = `rotateY(${currentYaw}deg) rotateX(${-currentPitch}deg)`;
    if (yawReadout) yawReadout.textContent = `${Math.round(currentYaw)}°`;
    if (slider) slider.value = Math.round(currentYaw);
  }

  // A. Scroll-driven 360-degree rotation!
  window.addEventListener('scroll', () => {
    if (isAutoSpinning || isDragging) return;
    const scrollY = window.scrollY || window.pageYOffset;
    // 360 rotation linked to scroll distance
    const scrollYaw = (scrollY * 0.45) % 360;
    updateTransform(scrollYaw, currentPitch);
  }, { passive: true });

  // B. Interactive mouse move (3D pitch / yaw tilt)
  if (wrap) {
    wrap.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * 18;
      const tiltY = (x / (rect.width / 2)) * 18;
      card.style.transform = `rotateY(${currentYaw + tiltY}deg) rotateX(${-tiltX}deg)`;
    });

    wrap.addEventListener('mouseleave', () => {
      if (!isDragging) updateTransform(currentYaw, 0);
    });

    // C. Drag to spin
    wrap.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startYaw = currentYaw;
      if (isAutoSpinning) stopAutoSpin();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      updateTransform(startYaw + deltaX * 0.8);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    wrap.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startYaw = currentYaw;
        if (isAutoSpinning) stopAutoSpin();
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - startX;
      updateTransform(startYaw + deltaX * 0.8);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // D. Manual Slider Scrubbing
  if (slider) {
    slider.addEventListener('input', (e) => {
      if (isAutoSpinning) stopAutoSpin();
      updateTransform(parseFloat(e.target.value));
    });
  }

  // E. Auto Orbit Toggle
  function startAutoSpin() {
    isAutoSpinning = true;
    if (autoBtn) {
      autoBtn.classList.add('active');
      autoBtn.textContent = 'Pause Orbit';
    }
    autoTimer = setInterval(() => {
      updateTransform(currentYaw + 1.2);
    }, 16);
  }

  function stopAutoSpin() {
    isAutoSpinning = false;
    if (autoBtn) {
      autoBtn.classList.remove('active');
      autoBtn.textContent = 'Auto Orbit';
    }
    if (autoTimer) clearInterval(autoTimer);
  }

  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      isAutoSpinning ? stopAutoSpin() : startAutoSpin();
    });
  }

  // F. Flip Card (180°)
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      if (isAutoSpinning) stopAutoSpin();
      updateTransform(currentYaw + 180);
    });
  }
}

// 4. Smooth Anchor Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
