// ==========================================================================
// 호떡 서버 (HOTTEOK SERVER) Interactive Logic & Dynamics
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initTabs();
  initBackToTop();
  initModalListeners();
  initSmoothScroll();
});

/* 1. Open Schedule Countdown Timer */
function initCountdown() {
  // Target server open date: 2026-08-18 19:00:00 KST
  const targetDate = new Date('2026-08-18T19:00:00+09:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById('countdownTimer').innerHTML = '<span class="text-gold">🔥 호떡 서버 정식 오픈 완료! 지금 바로 접속하세요!</span>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('timerDays');
    const hEl = document.getElementById('timerHours');
    const mEl = document.getElementById('timerMins');
    const sEl = document.getElementById('timerSecs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 2. Interactive Tabs Navigation */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* 4. Back To Top Scroll Handler */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 5. Modal Windows Toggle Logic */
function openModal(modalId) {
  const targetModal = document.getElementById(modalId);
  if (targetModal) {
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const targetModal = document.getElementById(modalId);
  if (targetModal) {
    targetModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function initModalListeners() {
  // Download button triggers
  const dlBtnHeader = document.getElementById('headerDownloadBtn');
  if (dlBtnHeader) {
    dlBtnHeader.addEventListener('click', () => openModal('modalDownload'));
  }

  // Close modals when clicking overlay area outside modal-card
  const overlays = document.querySelectorAll('.modal-overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

/* 5. CS & Auto Promo Form Submission Handler */
function handleCsSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('csName').value;
  const category = document.getElementById('csCategory').options[document.getElementById('csCategory').selectedIndex].text;

  alert(`[등록 완료] ${name} 캐릭터로 홍보 링크 등록이 정상적으로 완료되었습니다!\n\n자동 검증 시스템 확인 후 게임 내 [개인 창고]로 보상 아이템이 즉시 자동 발송됩니다.`);
  
  closeModal('modalCS');
  document.getElementById('csForm').reset();
}

/* 7. Smooth Scroll Link Handling */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.getElementById('mainHeader') ? document.getElementById('mainHeader').offsetHeight : 0;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* 8. Promo Text Copy Helper */
function copyPromoText() {
  const promoEl = document.getElementById('promoText');
  if (!promoEl) return;
  const text = promoEl.innerText.trim();
  if (!text) {
    alert('현재 설정된 홍보 내용이 없습니다. (추후 업데이트 예정)');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert('홍보내용이 복사되었습니다!');
  }).catch(() => {
    alert('복사에 실패했습니다. 직접 드래그하여 복사해 주세요.');
  });
}

