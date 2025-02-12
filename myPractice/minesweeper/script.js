"use strict";

// DOM 요소 불러오기
const rows = document.querySelectorAll(".row");
const cols = document.querySelectorAll(".col");
const bombCount = document.querySelector(".bombCount");
const timeCount = document.querySelector(".timeCount");
const newGameStartBtn = document.querySelector(".newGame");
const face = document.querySelector(".newGame > img");

// 선언
let firstClickIndex = 0;
let randomMines = [];
let isFirstClick = false;
let isGameOver = false;
let isWin = false;
let timer;
let unopenedCount = 0;

const aroundGap = [-10, -9, -8, -1, 1, 8, 9, 10]; // 8방향 index 규칙
const MINE_COUNT = 10; // 지뢰 개수 설정

// 초기화 함수
const settingNewGame = function () {
  // 1. 대시보드 초기화
  bombCount.innerHTML = "010";
  timerStop();
  timeCount.innerHTML = "000";
  face.src = "img/smile.png";
  // 2. 필드 초기화
  cols.forEach((element) => (element.className = ""));
  cols.forEach((element) => (element.className = "col"));
  cols.forEach((element) => (element.innerHTML = ""));
  // 3. 첫 클릭 관련 초기화
  firstClickIndex = 0;
  randomMines = [];
  isFirstClick = false;
  isGameOver = false;
  isWin = false;
  unopenedCount = 0;
};

// 첫 클릭 index 저장 함수
const getFirstIndex = (index) => (firstClickIndex = index);

// 지뢰 세팅 함수
const getRandomIndex = () => {
  let temp = [];
  while (temp.length < MINE_COUNT) {
    const randomIndex = Math.floor(Math.random() * cols.length);
    // 중복 확인 및 첫 클릭 위치 제외
    if (!temp.includes(randomIndex) && randomIndex !== firstClickIndex) {
      temp.push(randomIndex);
    }
  }
  randomMines = [...temp]; // 배열 복사
};

// 타이머 시작 함수
const timerStart = () => {
  timer = setInterval(function () {
    // 반환 값을 timer에 저장
    const currentTime = Number(timeCount.innerHTML); // 현재 타이머 값

    if (currentTime >= 999) {
      // 999에서 멈추기
      clearInterval(timer); // 타이머 멈춤
      return;
    }

    timeCount.innerHTML = (currentTime + 1).toString().padStart(3, "0");
  }, 1000);
};

// 타이머 종료 함수
const timerStop = () => {
  clearInterval(timer); // 타이머 멈춤
};

// 게임 클리어
const win = () => {
  // 1. 필드 클릭 불가능
  isWin = true;
  // 2. 타이머 stop
  timerStop();
  // 3. .newGame 버튼의 표정(face) 바뀌기
  face.src = "img/win.png";
};

// 게임 오버 (지뢰 좌클릭)
const gameover = () => {
  // 1. 전체 지뢰 위치 공개
  randomMines.forEach((e) => {
    cols[e].classList.add("mine");
  });
  // 2. 필드 클릭 불가능
  isGameOver = true;
  // 3. 타이머 stop
  timerStop();
  // 4. .newGame 버튼의 표정(face) 바뀌기
  face.src = "img/dead.png";
};

// 클릭한 지점 기준으로 8방향 호출 및 숫자 세팅 함수
const mineDetector = (col, index) => {
  // 게임 오버 (지뢰 좌클릭)
  if (randomMines.includes(index)) {
    gameover();
  }

  // 게임 오버나 클리어 시 작동 안 함
  if (isGameOver || isWin) {
    return;
  }

  // aroundClick과 mineIsNear을 지역 변수로 선언!
  let aroundClick = [];
  let mineIsNear = [];
  const rowLength = rows.length;

  // 현재 클릭한 셀을 'opened' 상태로 표시
  cols[index].classList.add("opened");

  // 게임 클리어(지뢰가 아닌 모든 셀을 열었을 때 = 지뢰 셀만 남았을 때 = WIN)
  unopenedCount = cols.length - document.querySelectorAll(".opened").length;
  if (unopenedCount === randomMines.length) {
    win();
    return;
  }

  // 클릭한 셀 주변 8방향의 인덱스를 계산
  aroundGap.forEach((gap) => {
    if (
      index + gap >= 0 &&
      index + gap < cols.length &&
      // 첫 열 -> 왼쪽 확장 방지
      !(index % rowLength === 0 && (gap === -10 || gap === -9 || gap === -8)) &&
      // 막 열 -> 오른쪽 확장 방지
      !(
        (index + 1) % rowLength === 0 &&
        (gap === 8 || gap === 9 || gap === 10)
      ) &&
      // 첫 행 -> 위쪽 확장 방지
      !(index < rowLength && (gap === -10 || gap === -1 || gap === 8)) &&
      // 막 행 -> 아래쪽 확장 방지
      !(
        index >= cols.length - rowLength &&
        (gap === -8 || gap === 1 || gap === 10)
      )
    ) {
      aroundClick.push(index + gap);
    }
  });

  // 주변 셀 중 지뢰가 있는 셀만 가져오기
  mineIsNear = aroundClick.filter((element) => randomMines.includes(element));

  // 주변에 지뢰가 있는 경우
  if (mineIsNear.length !== 0) {
    // 셀 안에 지뢰 수를 표시
    col.innerHTML = `${mineIsNear.length}`;
    return;
  } else {
    // 주변에 지뢰가 없으면 주변 셀들을 재귀적으로 열기
    aroundClick.forEach((safeCellIndex) => {
      if (!cols[safeCellIndex].classList.contains("opened")) {
        mineDetector(cols[safeCellIndex], safeCellIndex);
      }
    });
  }
};

// 좌클릭 이벤트
cols.forEach((col, index) => {
  col.addEventListener("click", function () {
    // '첫 클릭' 때에만 일어나야 하는 것 if문 안에 넣기
    if (!isFirstClick) {
      // 1. 첫 클릭 인지시키기
      isFirstClick = true;
      // 2. 첫 클릭 index 저장
      getFirstIndex(index);
      // 3. 지뢰 배치
      getRandomIndex();
      // 4. 타이머 시작
      timerStart();
    }
    // 좌클릭 시 일어나는 것 (기본)
    // 지뢰 탐지 및 숫자(8방향 지뢰 수) 배치
    mineDetector(col, index);
  });
});

// 새 게임
newGameStartBtn.addEventListener("click", settingNewGame);
