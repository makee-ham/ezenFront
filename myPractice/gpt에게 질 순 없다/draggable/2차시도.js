// 2차시도 250131
// // $(document).ready(function(){});...
// document.addEventListener("DOMContentLoaded", function () {});

const container = document.querySelector(".dragContainer");
const dragList = document.querySelector(".dragList");
const items = document.querySelectorAll(".items");

// 드래그 중일 때 x 좌표 감지하기
let mouseDowned = false;

container.addEventListener("mousedown", function (e) {
  e.preventDefault();
  mouseDowned = true;

  container.addEventListener("mousemove", function (e) {
    if (mouseDowned == true) {
      console.log(e.movementX);
    }
  });
});

container.addEventListener("mouseup", function (e) {
  mouseDowned = false;
});
