// 5차시도 (250201 GPT가 단계별로 해결할 문제 제시, 기존 코드 개선하기)

const container = document.querySelector(".dragContainer");
const dragList = document.querySelector(".dragList");

const gap = dragList.clientWidth - container.clientWidth;

let isDragging = false;
let startX = 0;
let currentX = 0;
let movedX = 0;

let previousX = 0;
let velocity = 0;

// 관성 함수
function inertia() {
  if (Math.abs(velocity) < 0.5) return; // 속도가 너무 작아지면 멈추기

  movedX += velocity; // 이동 거리 업데이트 (누적)
  velocity *= 0.95; // 속도 점점 줄이기

  movedX = Math.max(-gap, Math.min(0, movedX)); // 이동 범위 제한
  dragList.style.transform = `translateX(${movedX}px)`; // 적용 후 렌더링

  // inertia는 재귀 함수다!
  // requestAnimationFrame(callback)은 브라우저에게 "다음 프레임에서 callback 함수를 실행해줘!" 라고 요청하는 함수
  window.requestAnimationFrame(inertia); // 애니메이션 반복 실행
}

dragList.addEventListener("mousedown", function (e) {
  isDragging = true;
  startX = e.clientX;

  // previousX 초기화 (클릭한 순간의 위치 저장)
  previousX = e.clientX;

  dragList.style.cursor = "grabbing";
  e.preventDefault();
});

document.addEventListener("mouseup", function () {
  isDragging = false;
  dragList.style.cursor = "grab";

  // 관성 효과
  inertia();
});

document.addEventListener("mousemove", function (e) {
  if (!isDragging) return;

  // 드래그 (마우스) 속도 감지하기

  // 1단계: 마우스 움직이는 속도 측정

  // [거 = 속 * 시]니까 [속도 = 거리 / 시간]??

  // ㄴ 하지만 여기서는 시간 차이(Δt) 를 직접 측정하지 않아도 돼. (시간 어차피 고정)
  // 프레임 단위(mousemove 이벤트 발생 간격)를 이용해서 속도를 구하는 방법을 쓸 거야.
  // 즉, **"이전 마우스 위치와 현재 마우스 위치의 차이"**를 이용하면 돼!

  currentX = e.clientX; // 현재 마우스 위치 업데이트
  velocity = currentX - previousX; // 속도 계산
  previousX = currentX; // 위치 업데이트

  movedX += velocity; // movedX 업데이트

  movedX = Math.max(-gap, Math.min(0, movedX)); // 이동 제한 적용
  dragList.style.transform = `translateX(${movedX}px)`; // 적용 후 렌더링
});
