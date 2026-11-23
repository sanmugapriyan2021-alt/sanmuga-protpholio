// Google Cyber-Dark System for R. S. Sanmugapriyan
// Engineered with Vibe Coding & Google Antigravity Architecture

document.addEventListener('DOMContentLoaded', () => {
  initAntigravityBackground();
  initAvatar360AndFlip();
  initProjectsAutoScroll();
  initWhatsAppAccessModal();
  initAppLauncher();
  initLinkedInCopy();
});

/* ========================================================
   1. DYNAMIC GOOGLE ANTIGRAVITY & GEMINI BLUE-DOT WATERMARK
   ======================================================== */
function initAntigravityBackground() {
  const canvas = document.getElementById('antigravityCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let scrollY = window.scrollY || 0;
  let targetScrollY = scrollY;
  let scrollVelocity = 0;
  let lastScrollY = scrollY;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 40 : 80;
    const colors = ['#8ab4f8', '#22d3ee', '#60a5fa', '#a78bfa', '#81c995'];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        alpha: Math.random() * 0.55 + 0.25,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY || window.pageYOffset;
    scrollVelocity = (targetScrollY - lastScrollY) * 0.15;
    lastScrollY = targetScrollY;
  }, { passive: true });

  resize();

  let time = 0;

  function render() {
    time += 0.015;
    scrollY += (targetScrollY - scrollY) * 0.08;
    scrollVelocity *= 0.92;

    ctx.clearRect(0, 0, width, height);

    // Dynamic Google Antigravity & Gemini Gravitational Glow Orb
    const orbX = width * 0.5 + Math.sin(time * 0.35) * (width * 0.18);
    const orbY = height * 0.4 + Math.cos(time * 0.28) * (height * 0.12) - ((scrollY * 0.12) % height);
    
    const orbRadius = Math.min(width, height) * 0.45;
    const grad = ctx.createRadialGradient(orbX, orbY, 5, orbX, orbY, orbRadius);
    grad.addColorStop(0, 'rgba(138, 180, 248, 0.09)');
    grad.addColorStop(0.45, 'rgba(34, 211, 238, 0.04)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Antigravity Watermark Orbital Rings
    ctx.save();
    ctx.translate(width * 0.85, height * 0.32 - ((scrollY * 0.07) % (height * 0.6)));
    ctx.rotate(time * 0.12);
    ctx.strokeStyle = 'rgba(138, 180, 248, 0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 14]);
    ctx.beginPath();
    ctx.arc(0, 0, 150, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Floating Quantum Nodes & Neural Connected Mesh
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy - scrollVelocity * 0.25;
      p.pulsePhase += p.pulseSpeed;

      if (p.x < -15) p.x = width + 15;
      if (p.x > width + 15) p.x = -15;
      if (p.y < -15) p.y = height + 15;
      if (p.y > height + 15) p.y = -15;

      const dynamicRadius = p.radius + Math.sin(p.pulsePhase) * 0.6;
      const dynamicAlpha = Math.max(0.12, Math.min(0.75, p.alpha + Math.sin(p.pulsePhase) * 0.2));

      // Draw particle dot
      ctx.fillStyle = p.color;
      ctx.globalAlpha = dynamicAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.6, dynamicRadius), 0, Math.PI * 2);
      ctx.fill();

      // Soft glow for larger nodes
      if (p.radius > 2.2) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dynamicRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Connecting neural lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = window.innerWidth < 768 ? 90 : 135;

        if (dist < maxDist) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / maxDist) * 0.2;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ========================================================
   2. DYNAMIC 360° AUTOMATIC ROTATING + FLIP 3D AVATAR
   ======================================================== */
function initAvatar360AndFlip() {
  const card = document.getElementById('avatarCard');
  if (!card) return;

  let isFlipped = false;
  let currentAngle = 0;
  const autoSpinSpeed = 0.42; // smooth degrees per animation frame
  let animId = null;

  function spinLoop() {
    if (!isFlipped) {
      currentAngle = (currentAngle + autoSpinSpeed) % 360;
      card.style.transform = `rotateY(${currentAngle}deg)`;
    }
    animId = requestAnimationFrame(spinLoop);
  }

  function toggleFlip() {
    isFlipped = !isFlipped;
    card.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1)';
    
    if (isFlipped) {
      card.classList.add('locked-flip');
      card.style.transform = 'rotateY(180deg)';
    } else {
      card.classList.remove('locked-flip');
      card.style.transform = 'rotateY(0deg)';
      currentAngle = 0;
      setTimeout(() => {
        card.style.transition = 'none';
      }, 650);
    }
  }

  // Click & tap support for desktop and mobile
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFlip();
  });

  let touchStartData = { x: 0, y: 0, time: 0 };
  card.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartData = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }
  }, { passive: true });

  card.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartData.x);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartData.y);
      const dt = Date.now() - touchStartData.time;
      if (dx < 14 && dy < 14 && dt < 450) {
        // Clear tap detected
        toggleFlip();
      }
    }
  });

  // When scrolling down, if user had flipped to back, smoothly flip back and resume rotation
  let scrollResumeTimer;
  window.addEventListener('scroll', () => {
    if (isFlipped) {
      clearTimeout(scrollResumeTimer);
      scrollResumeTimer = setTimeout(() => {
        if (isFlipped) {
          isFlipped = false;
          card.classList.remove('locked-flip');
          card.style.transition = 'transform 0.6s ease';
          card.style.transform = 'rotateY(0deg)';
          currentAngle = 0;
          setTimeout(() => { card.style.transition = 'none'; }, 600);
        }
      }, 200);
    }
  }, { passive: true });

  // Start continuous 360° spin
  card.style.transition = 'none';
  animId = requestAnimationFrame(spinLoop);
}

/* ========================================================
   3. HORIZONTAL LEFT-TO-RIGHT AUTO-SCROLL CAROUSEL
   ======================================================== */
function initProjectsAutoScroll() {
  const track = document.getElementById('projectsScrollTrack');
  const statusEl = document.getElementById('scrollStatusText');
  const toggleBtn = document.getElementById('scrollToggleBtn');
  const prevBtn = document.getElementById('scrollPrevBtn');
  const nextBtn = document.getElementById('scrollNextBtn');
  const edgePrev = document.getElementById('edgePrevBtn');
  const edgeNext = document.getElementById('edgeNextBtn');
  
  if (!track) return;

  let isPausedByUser = false;
  let isHovered = false;
  let isInteracting = false;
  let resumeTimer = null;
  let scrollPos = track.scrollLeft || 0;
  const speed = 0.9; // pixels per animation frame (float precision)

  function updateStatus(text, paused) {
    if (statusEl) statusEl.textContent = text;
    if (toggleBtn) toggleBtn.innerHTML = paused ? '&#9654; Resume' : '&#10074;&#10074; Pause';
  }

  function autoScrollLoop() {
    if (!isPausedByUser && !isHovered && !isInteracting) {
      scrollPos += speed;
      track.scrollLeft = Math.round(scrollPos);

      // Seamless continuous loop when near the end of scroll
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (scrollPos >= maxScroll - 4) {
        scrollPos = 0;
        track.scrollLeft = 0;
      }
    } else {
      // Sync position when user manually scrolls or touches
      scrollPos = track.scrollLeft;
    }
    requestAnimationFrame(autoScrollLoop);
  }

  function pauseTemporarily(durationMs = 2800) {
    isInteracting = true;
    updateStatus('Paused (Interacting)', true);
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isInteracting = false;
      scrollPos = track.scrollLeft;
      if (!isPausedByUser) updateStatus('Auto-Scrolling (Left \u2192 Right)', false);
    }, durationMs);
  }

  // Hover detection (desktop)
  track.addEventListener('mouseenter', () => {
    isHovered = true;
    updateStatus('Paused (Hover)', true);
  });
  track.addEventListener('mouseleave', () => {
    isHovered = false;
    scrollPos = track.scrollLeft;
    if (!isPausedByUser && !isInteracting) updateStatus('Auto-Scrolling (Left \u2192 Right)', false);
  });

  // Touch handling on mobile
  track.addEventListener('touchstart', () => {
    isInteracting = true;
    clearTimeout(resumeTimer);
    updateStatus('User Swiping', true);
  }, { passive: true });

  track.addEventListener('touchmove', () => {
    isInteracting = true;
    scrollPos = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    scrollPos = track.scrollLeft;
    pauseTemporarily(2400);
  }, { passive: true });

  // Scroll listener to sync position
  track.addEventListener('scroll', () => {
    if (isInteracting || isHovered) {
      scrollPos = track.scrollLeft;
    }
  }, { passive: true });

  // Navigation button actions (step by 380px or card width)
  function handleStep(direction) {
    pauseTemporarily(3200);
    const cardStep = window.innerWidth < 768 ? 320 : 380;
    track.scrollBy({ left: direction * cardStep, behavior: 'smooth' });
    setTimeout(() => {
      scrollPos = track.scrollLeft;
    }, 400);
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); handleStep(-1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); handleStep(1); });
  if (edgePrev) edgePrev.addEventListener('click', (e) => { e.preventDefault(); handleStep(-1); });
  if (edgeNext) edgeNext.addEventListener('click', (e) => { e.preventDefault(); handleStep(1); });

  // Play / Pause toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isPausedByUser = !isPausedByUser;
      if (!isPausedByUser) {
        scrollPos = track.scrollLeft;
        updateStatus('Auto-Scrolling (Left \u2192 Right)', false);
      } else {
        updateStatus('Paused by User', true);
      }
    });
  }

  // Start continuous scroll loop
  requestAnimationFrame(autoScrollLoop);
}

/* ========================================================
   4. GATED WHATSAPP ACCESS MODAL
   ======================================================== */
function initWhatsAppAccessModal() {
  const modal = document.getElementById('waModal');
  const triggers = document.querySelectorAll('.trigger-wa-access');
  const closeBtn = document.getElementById('closeWaModal');
  const form = document.getElementById('waAccessForm');
  const formState = document.getElementById('waFormState');
  const successState = document.getElementById('waSuccessState');
  const directLink = document.getElementById('waDirectLink');

  if (!modal) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      if (formState) formState.style.display = 'block';
      if (successState) successState.style.display = 'none';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('waReqName').value.trim();
      const org = document.getElementById('waReqOrg').value.trim();
      const purpose = document.getElementById('waReqPurpose').value.trim();

      const encodedMsg = encodeURIComponent(
        `Hi R. S. Sanmugapriyan, I am ${name} from ${org}. Purpose: ${purpose}`
      );
      const waUrl = `https://wa.me/918438539264?text=${encodedMsg}`;

      if (directLink) directLink.href = waUrl;
      if (formState) formState.style.display = 'none';
      if (successState) successState.style.display = 'block';
    });
  }
}

/* ========================================================
   5. GOOGLE APPS 9-DOTS WAFFLE MENU
   ======================================================== */
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

/* ========================================================
   6. LINKEDIN POST CLIPBOARD COPY
   ======================================================== */
function initLinkedInCopy() {
  const btn = document.getElementById('copyLinkedInBtn');
  const feedback = document.getElementById('copyFeedback');
  const postTextEl = document.getElementById('linkedInPostContent');
  if (!btn || !postTextEl) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(postTextEl.innerText.trim());
      if (feedback) {
        feedback.style.display = 'inline-block';
        setTimeout(() => { feedback.style.display = 'none'; }, 3000);
      }
      btn.textContent = 'Copied to Clipboard! \u2713';
      setTimeout(() => { btn.textContent = 'Copy Post Text \U0001F4CB'; }, 3000);
    } catch (err) {
      console.log('Clipboard fallback:', err);
    }
  });
}
