document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // 기존 애니메이션
  gsap.from(".logo", { opacity: 0, y: -20, duration: 1 });
  gsap.from(".main-text h1", { opacity: 0, y: 20, duration: 1, delay: 0.3 });
  gsap.from(".main-text .subtitle", { opacity: 0, y: 20, duration: 1, delay: 0.6 });

  document.querySelectorAll(".fade-slide").forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 1
    });
  });

  // ✅ 추가된 부분: 섹션2 메뉴박스 → 상세 섹션 스크롤 이동
  document.querySelectorAll(".feature-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetEl, offsetY: 70 },
        ease: "power2.out"
      });
    });
  });

  // 기존 상세 섹션 애니메이션
  const featureAnimations = [
    { id: "#feature-detail-1", from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } },
    { id: "#feature-detail-2", from: { scale: 0.8, opacity: 0 }, to: { scale: 1, opacity: 1 } },
    { id: "#feature-detail-3", from: { y: 100, opacity: 0 }, to: { y: 0, opacity: 1 } },
    { id: "#feature-detail-4", from: { rotationX: 90, opacity: 0 }, to: { rotationX: 0, opacity: 1, transformOrigin: "top center" } },
    { id: "#feature-detail-5", from: { x: 100, opacity: 0 }, to: { x: 0, opacity: 1 } },
  ];

  featureAnimations.forEach(({ id, from, to }) => {
    const section = document.querySelector(id);
    if (!section) return;

    gsap.fromTo(section, from, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      ...to,
      duration: 1.2,
      ease: "power2.out",
    });
  });

  // 맨 위로 버튼
  const scrollBtn = document.querySelector(".scroll-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollBtn.classList.add("show");
    else scrollBtn.classList.remove("show");
  });
  scrollBtn.addEventListener("click", () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.out" });
  });

  // 로고 새로고침 → 맨 위 이동
  document.querySelector(".logo").addEventListener("click", () => {
    window.location.reload();
    setTimeout(() => window.scrollTo(0, 0), 0);
  });

  window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
  });
});
