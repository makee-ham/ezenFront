window.addEventListener("scroll", function () {
  let parallaxSections = document.querySelectorAll(".parallax");

  parallaxSections.forEach((section) => {
    let speed = 0.5; // 속도 조절
    let sectionTop = section.offsetTop; // 섹션의 시작 위치
    let scrollY = window.scrollY;
    let yOffset = (scrollY - sectionTop) * speed; // 해당 섹션 기준으로 패럴랙스 효과 적용

    section.style.backgroundPosition = `center calc(50% + ${yOffset}px)`;
  });
});
