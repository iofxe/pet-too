document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ 1. 로딩 모션
  function runIntroAnimation() {
    gsap.from(".logo", { opacity: 0, y: -20, duration: 1 });
    gsap.from(".main-text h1", { opacity: 0, y: 20, duration: 1, delay: 0.3 });
    gsap.from(".main-text .subtitle", { opacity: 0, y: 20, duration: 1, delay: 0.6 });
  }
  runIntroAnimation();

  // ✅ 2. fade-slide 요소 스크롤 모션
  document.querySelectorAll(".fade-slide").forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 1
    });
  });

  // ✅ 3. 스크롤 시 헤더 shrink + 맨위로 버튼
  const scrollBtn = document.querySelector(".scroll-top");
  window.addEventListener("scroll", () => {
    document.querySelector("header.hero")
      .classList.toggle("shrink", window.scrollY > 50);
    if (window.scrollY > 300) scrollBtn.classList.add("show");
    else scrollBtn.classList.remove("show");
  });

  // ✅ 4. 맨위로 버튼 동작
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ✅ 5. 로고 클릭 시 → 처음으로 올라가고 모션 재실행
  document.querySelector(".logo").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => runIntroAnimation(), 600);
  });

  // ✅ 6. 후기 슬라이더 (3초마다 변경)
  const reviews = document.querySelectorAll(".review-slider .review");
  let currentReview = 0;
  setInterval(() => {
    reviews[currentReview].classList.remove("active");
    currentReview = (currentReview + 1) % reviews.length;
    reviews[currentReview].classList.add("active");
  }, 3000);
});
