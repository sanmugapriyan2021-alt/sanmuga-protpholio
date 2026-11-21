// Modern Cyber-Dark System for R. S. Sanmugapriyan
document.addEventListener('DOMContentLoaded', () => {
  initAvatar360AndFlip();
  initWhatsAppAccessModal();
  initAppLauncher();
});

// 1. 360 Scroll Rotation + Click to Flip & Lock + Resume on Scroll
function initAvatar360AndFlip() {
  const card = document.getElementById('avatarCard');
  if (!card) return;

  let isFlippedLocked = false;
  let scrollYaw = 0;

  // Click card to flip 180° front or back and lock so user can read!
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    isFlippedLocked = !isFlippedLocked;
    
    if (isFlippedLocked) {
      card.classList.add('locked-flip');
      card.style.transform = 'rotateY(180deg)';
    } else {
      card.classList.remove('locked-flip');
      card.style.transform = `rotateY(${scrollYaw}deg)`;
    }
  });

  // Scroll event: resumes 360° rotation smoothly!
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    scrollYaw = (scrollY * 0.45) % 360;

    // If locked in flip mode and user scrolls, resume 360° rotation
    if (isFlippedLocked) {
      isFlippedLocked = false;
      card.classList.remove('locked-flip');
    }

    card.style.transform = `rotateY(${scrollYaw}deg)`;
  }, { passive: true });
}

// 2. Gated WhatsApp Access
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

// 3. Google Waffle 9-dots Menu
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
