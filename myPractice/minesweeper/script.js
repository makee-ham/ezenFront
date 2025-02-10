"use strict";

// DOM 요소 불러오기
const rows = document.querySelectorAll(".row");
const cols = document.querySelectorAll(".col");

/////////////////////////////////////////////////////////

// 처음으로 클릭한 .col의 index를 불러오기
// // 일단 .col 안의 개성 없는 li들에 index라는 개성 부여하기...!
// for (let i = 0; i < cols.length; i++) {
//   cols[i].classList.add(`${i}`);
// }
// // 개성이 생긴 li(.col)들에게 클릭 이벤트 리스너 전부 등록
// // https://gahyun-web-diary.tistory.com/294
// cols.forEach((event) => {
//   event.addEventListener("click", function () {
//     // ... 어라 jQuery에 index()라는 게 있네? 이걸 바닐라로 구현해보자
//   });
// });

/////////////////////////////////////////////////////////

// 재도전! '처음으로' 클릭한 .col의 index를 불러오기

// 매 회기 처음으로 클릭한 .col의 좌표를 기억하는 변수
let firstClick = [];
// 메모: 좌표는 [row, col] 형태로 저장되는데, 이거로 li를 특정할 수 있나?

// 대상 element의 index 불러오는 함수, getElmIndex
// https://stackoverflow.com/questions/13658021/jquery-index-in-vanilla-javascript
const getElmIndex = (elm) => [...elm.parentNode.children].indexOf(elm);

// 메모: 아래를 새 게임의 최초 필드 좌클릭 순간에 한 번만 실행!!!
// (firstClick 초기화 잊지 말자)

// firstClick에 [row, col] 좌표를 저장해주는 작업
cols.forEach((event) => {
  event.addEventListener(
    "click",
    function () {
      rows.forEach((event) => {
        event.addEventListener(
          "click",
          function () {
            firstClick.push(getElmIndex(event));
          },
          // row와 col 각각에 once:true 적용으로
          // 매트릭스? 필드 전체에 단 한 번만 클릭 이벤트 발생하게 함
          // https://velog.io/@khd/%ED%95%9C%EB%B2%88%EB%A7%8C-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%ED%95%A8%EC%88%98-oncetrue-X
          { once: true }
        );
      });
      firstClick.push(getElmIndex(event));
    },
    { once: true }
  );
});

//////////////////////////////////////////////////

// 지뢰에 해당되는 index 저장용 배열
let randomMines = [];

// 지뢰를 세팅하는 함수
// 목표: cols 배열의 요소 중 랜덤으로 10개의 요소에 지뢰 설치해야 함!
// 0부터 cols.length - 1까지의 수 중 10개를 랜덤으로 골라 기억하는 함수 만들기
// (이 함수의 발동 타이밍은 아무 '.col'이나 눌렀을 때)

// 메모: firstClick의 좌표 제외하고 지뢰 설치해야 함!!!
const getRandomIndex = () => {
  let temp = [];
  let randomIndex = 0;
  for (let i = 0; i < 9; ) {
    randomIndex = Math.floor(Math.random() * cols.length);
    if (temp.includes(randomIndex)) {
      i--;
    } else {
      i++;
      temp.push(randomIndex);
    }
  }
  randomMines = [...temp];
};

// 메모: 지뢰로 설정된 요소(randomMines에 있는 index 가진 요소들)를 좌클릭 시 '.mine' 클래스 추가
// .mine은 좌클릭 시 게임오버+전체 .mine 위치 공개
// https://heojju.tistory.com/14

// 메모: <타이머>
// [새 게임 최초 필드 좌클릭 시]
// ㄴ타이머 시작
// [타이머 종료 시점]
// ㄴ게임 오버
// ㄴ게임 클리어
// [타이머 초기화 시점]
// ㄴ새 게임 클릭
