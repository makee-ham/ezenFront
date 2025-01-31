// 3차시도 (GPT가 단계별로 해결할 문제 제시)

const container = document.querySelector(".dragContainer");
const dragList = document.querySelector(".dragList");
const items = document.querySelectorAll(".items");

let isDragging = false;
let startX = 0;
let currentX = 0;
let movedX = 0;

dragList.addEventListener("mousedown", function (e) {
  startX = e.clientX;
  isDragging = true;
  dragList.style.cursor = "grabbing";
});

// 기준을 document로 바꿔야 mouseup 아무데서나 가능
document.addEventListener("mouseup", function () {
  isDragging = false;
  dragList.style.cursor = "grab";
});

// 기준을 document로 바꿔야 mousemove 아무데서나 가능
document.addEventListener("mousemove", function (e) {
  if (!isDragging) return;

  currentX = e.clientX;
  // 여기가 좀 이해가 잘 안 되는데... 아무튼 값이 부드럽게 바뀌기 위함임
  movedX += currentX - startX;
  startX = currentX;

  dragList.style.transform = `translateX(${movedX}px)`;
});
