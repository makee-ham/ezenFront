// 4차시도 (GPT가 단계별로 해결할 문제 제시, 기존 코드 개선하기)

const container = document.querySelector(".dragContainer");
const dragList = document.querySelector(".dragList");

// .clientWidth: The Element.clientWidth property is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels. It includes padding but excludes borders, margins, and vertical scrollbars (if present).
// https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
const gap = dragList.clientWidth - container.clientWidth;

let isDragging = false;
let startX = 0;
let currentX = 0;
let movedX = 0;

dragList.addEventListener("mousedown", function (e) {
  isDragging = true;
  startX = e.clientX;
  dragList.style.cursor = "grabbing";
  e.preventDefault(); // 마우스다운 이벤트로 인한 클릭과 텍스트 드래그를 방지
});

document.addEventListener("mouseup", function () {
  isDragging = false;
  dragList.style.cursor = "grab";
});

document.addEventListener("mousemove", function (e) {
  if (!isDragging) return;

  currentX = e.clientX;
  movedX += (currentX - startX) * 0.8; // 좀 더 천천히 슬라이드되게
  startX = currentX;

  // Math.min(a, b)는 두 값 중 작은 값을 반환하는 함수
  // 0보다 커지면 0 반환
  // -gap보다 작아지면 -gap 반환
  // movedX의 x 값이(즉 제일 왼쪽 기준), x=0보다 커지거나 x=-gap보다 작아지지 않게
  // x=0보다 커져서 리스트가 오른쪽으로 이동(왼쪽이 밀림)하게 되면 저어어기 오른쪽으로 사라지겠지
  // 마찬가지로 x=-gap보다 작아지면 저어어기 왼쪽으로 사라져

  movedX = Math.max(-gap, Math.min(0, movedX));

  dragList.style.transform = `translateX(${movedX}px)`;
});
