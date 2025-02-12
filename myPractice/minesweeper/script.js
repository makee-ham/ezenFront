"use strict";

// DOM 요소 불러오기
const rows = document.querySelectorAll(".row");
const cols = document.querySelectorAll(".col");

// 선언
let firstClickIndex = 0;
let randomMines = [];
let isFirstClick = false;
let aroundClick = [];
const aroundGap = [-10, -9, -8, -1, 1, 8, 9, 10];
let mineIsNear = [];

// 초기화 함수
const settingNewGame = function () {
  // 1. 대시보드 초기화
  document.querySelector(".bombCount").innerHTML = "010";
  document.querySelector(".timeCount").innerHTML = "000";
  document.querySelector(".newGame > img").src = "img/smile.png";
  // 2. 필드 초기화
  cols.forEach((element) => (element.className = ""));
  cols.forEach((element) => (element.className = "col"));
  // 3. 첫 클릭 관련 초기화
  firstClickIndex = 0;
  randomMines = [];
  isFirstClick = false;
};

// 첫 클릭 index 저장 함수
const getFirstIndex = (index) => (firstClickIndex = index);

// 지뢰 세팅 함수
const getRandomIndex = () => {
  let temp = [];
  let randomIndex = 0;
  for (let i = 0; i < 9; ) {
    randomIndex = Math.floor(Math.random() * cols.length);
    if (temp.includes(randomIndex) || randomIndex === firstClickIndex) {
      i--;
    } else {
      i++;
      temp.push(randomIndex);
    }
  }
  randomMines = [...temp];
};

// 클릭한 지점 기준으로 8방향 호출 및 숫자 세팅 함수
const mineDetector = (col, index) => {
  // 임시값에 index + aroundGap 계산 받고 배열에 넣어주기
  aroundGap.forEach((gap) => {
    if (index + gap >= 0 && index + gap <= 80) {
      aroundClick.push(index + gap);
    }
  });

  // opened 클래스 추가
  cols[index].classList.add("opened");

  // 주변에 지뢰가 있는지 여부 확인하기
  // https://velog.io/@ireneeming/JavaScript-%EB%91%90-%EB%B0%B0%EC%97%B4-%EB%B9%84%EA%B5%90%ED%95%98%EA%B8%B0-filter
  mineIsNear = aroundClick.filter((element) => randomMines.includes(element));

  // 지뢰가 근처에 있는 경우
  if (mineIsNear.length !== 0) {
    // 숫자 써주기
    col.innerHTML = `${mineIsNear.length}`;
    // aroundClick, mineIsNear 초기화
    aroundClick = [];
    mineIsNear = [];
    // 함수 종료
    return;

    // 지뢰가 근처에 없는 경우
  } else {
    // 열어제쳐~~
    aroundClick.forEach((noMineCell, noMineIndex) => {
      cols[noMineCell].classList.add("opened");
      // aroundClick에 있는 8방향 8개의 셀에도 mineDetector 사용(재귀)
      mineDetector(noMineCell, noMineIndex);
    });
    // aroundClick, mineIsNear 초기화
    aroundClick = [];
    mineIsNear = [];
  }
};

// 좌클릭 이벤트
cols.forEach((col, index) => {
  col.addEventListener("click", function () {
    // '첫 클릭' 때에만 일어나야 하는 것
    if (!isFirstClick) {
      // 1. 첫 클릭 인지시키기
      isFirstClick = true;
      // 2. 첫 클릭 index 저장
      getFirstIndex(index);
      // 3. 지뢰 배치
      getRandomIndex();
      // 5. 타이머 시작
    } else {
      // 4. 숫자(8방향 지뢰 수) 배치
      mineDetector(col, index);
    }
    // 좌클릭 시 일어나는 것 (기본)
    // <지뢰 셀이 아닐 경우>
    // 1. 클릭한 지점 오픈
    // 2. 주변 셀 오픈(숫자 나올 때까지)
    // <지뢰 셀일 경우 = 'GAME OVER'>
    // 1. 전체 지뢰 위치 공개
    // 2. 필드 클릭 불가능
    // 3. 타이머 stop
    // 4. .newGame 버튼의 표정 바뀌기

    // <지뢰가 아닌 모든 셀을 열었을 때 = 지뢰 셀만 남았을 때 = GAME CLEAR>
    // 1. 필드 클릭 불가능
    // 2. 타이머 stop
    // 3. .newGame 버튼의 표정 바뀌기
  });
});

// 메모: 이미 .opened 있는 곳은 재클릭 불가
