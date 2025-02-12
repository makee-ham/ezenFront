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
  // 클릭한 셀이 지뢰라면 게임 오버 처리
  if (randomMines.includes(index)) {
    gameover();
    return;
  }

  // 게임 오버나 클리어 상태면 함수 종료
  if (isGameOver || isWin) return;

  // 보드가 컬럼 메이저 배열이라고 가정할 때,
  // rows.length는 '행의 개수'이고, 총 열의 수는 cols.length / rows.length 입니다.
  const rowLength = rows.length; // 행의 개수 (예: 9)
  const totalColumns = cols.length / rowLength; // 열의 개수 (예: 9)
  // 현재 셀의 좌표 계산: (r, c)
  const r = index % rowLength; // 행 번호 (0부터 시작; 위쪽이 0)
  const c = Math.floor(index / rowLength); // 열 번호 (0부터 시작; 왼쪽이 0)

  // 현재 셀을 열림 상태로 표시
  cols[index].classList.add("opened");

  // 게임 클리어 체크: 남은 미개봉 셀 수가 지뢰 수와 같으면 승리
  unopenedCount = cols.length - document.querySelectorAll(".opened").length;
  if (unopenedCount === randomMines.length) {
    win();
    return;
  }

  let aroundClick = [];

  // 각 offset(gap)에 대해 주변 셀의 인덱스를 계산 (경계 조건 체크 포함)
  aroundGap.forEach((gap) => {
    const neighborIndex = index + gap;
    // 인덱스 범위 체크
    if (neighborIndex < 0 || neighborIndex >= cols.length) return;

    // 각 gap에 따른 경계 조건
    // 좌측 상단 (-10): 위쪽(바로 위)와 왼쪽(바로 왼쪽)이 모두 존재해야 함
    if (gap === -10 && (r === 0 || c === 0)) return;
    // 좌측 (-9): 왼쪽 열이 있어야 함
    if (gap === -9 && c === 0) return;
    // 좌측 하단 (-8): 아래쪽(바로 아래)와 왼쪽(바로 왼쪽)이 모두 존재해야 함
    if (gap === -8 && (r === rowLength - 1 || c === 0)) return;
    // 바로 위 (-1): 위쪽 행이 있어야 함
    if (gap === -1 && r === 0) return;
    // 바로 아래 (+1): 아래쪽 행이 있어야 함
    if (gap === 1 && r === rowLength - 1) return;
    // 우측 상단 (+8): 위쪽과 오른쪽 열이 있어야 함
    if (gap === 8 && (r === 0 || c === totalColumns - 1)) return;
    // 우측 (+9): 오른쪽 열이 있어야 함
    if (gap === 9 && c === totalColumns - 1) return;
    // 우측 하단 (+10): 아래쪽과 오른쪽 열이 있어야 함
    if (gap === 10 && (r === rowLength - 1 || c === totalColumns - 1)) return;

    // 위의 조건을 통과하면, 유효한 주변 셀로 추가
    aroundClick.push(neighborIndex);
  });

  // 주변 셀 중 지뢰가 있는 셀들을 필터링
  const mineIsNear = aroundClick.filter((neighborIndex) =>
    randomMines.includes(neighborIndex)
  );

  if (mineIsNear.length !== 0) {
    // 주변에 지뢰가 있으면, 해당 개수를 셀에 표시
    col.innerHTML = mineIsNear.length;
    return;
  } else {
    // 주변에 지뢰가 없으면, 재귀적으로 주변 셀을 열기
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
