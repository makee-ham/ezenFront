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
  // 4. 우클릭 관련 초기화
  cols.forEach((col, index) => {
    clickData[index] = { clickCount: 0, flag: false, question: false };
    col.classList.remove("flag", "question");
  });
};

// 첫 클릭 index 저장 함수
const getFirstIndex = (index) => (firstClickIndex = index);

// 지뢰 세팅 함수
const getRandomIndex = () => {
  let temp = [];
  while (temp.length < MINE_COUNT) {
    const randomIndex = Math.floor(Math.random() * cols.length);
    // 중복 확인 및 첫 클릭 위치(주변 8개 포함) 제외
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

// 새 게임
newGameStartBtn.addEventListener("click", settingNewGame);

// 클릭 관련 정보 저장
let clickData = {};

// 우클릭 이벤트
cols.forEach((col, index) => {
  // 각 셀마다의 상태 초기화 + 저장
  clickData[index] = { clickCount: 0, flag: false, question: false };

  col.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // 우클릭 메뉴 뜨는 것 자체를 방지
    // https://velog.io/@sjmh0507/JavaScript-contextmenu%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%A7%88%EC%9A%B0%EC%8A%A4-%EC%9A%B0%ED%81%B4%EB%A6%AD-%EB%B0%A9%EC%A7%80%ED%95%98%EA%B8%B0
  });

  col.addEventListener("mousedown", function (e) {
    if (e.button === 2 || e.which === 3) {
      e.preventDefault(); // 우클릭 기본 기능 방지

      // 이미 opened 상태라면 우클릭 이벤트 종료
      if (col.classList.contains("opened")) return;

      // 클릭한 index property 안의 clickCount(key) value 증가
      clickData[index].clickCount++;

      // clickCount value에 따른 상태 변화
      if (
        clickData[index].clickCount === 0 ||
        clickData[index].clickCount % 3 === 0
      ) {
        // 아무 변화 없음
        clickData[index].flag = false;
        clickData[index].question = false;
      } else if (clickData[index].clickCount % 3 === 1) {
        // 깃발
        clickData[index].flag = true;
        clickData[index].question = false;
      } else {
        // 물음표
        clickData[index].flag = false;
        clickData[index].question = true;
      }

      // flag와 question value에 따른 변화 (청기내려 백기올려...)
      if (clickData[index].flag) {
        // 깃발 보이게
        col.classList.add("flag");
        // bombCount 줄이기
        bombCount.innerHTML =
          Number(bombCount.innerHTML) - 1 >= 0
            ? (Number(bombCount.innerHTML) - 1).toString().padStart(3, "0")
            : "-" +
              Math.abs(Number(bombCount.innerHTML) - 1)
                .toString()
                .padStart(2, "0");
      } else {
        // 깃발 안 보이게
        col.classList.remove("flag");
      }
      if (clickData[index].question) {
        // 물음표 보이게
        col.classList.add("question");
        // bombCount 늘리기
        bombCount.innerHTML =
          Number(bombCount.innerHTML) + 1 >= 0
            ? (Number(bombCount.innerHTML) + 1).toString().padStart(3, "0")
            : "-" +
              Math.abs(Number(bombCount.innerHTML) + 1)
                .toString()
                .padStart(2, "0");
      } else {
        // 물음표 안 보이게
        col.classList.remove("question");
      }
    }
  });
});

// 클릭한 지점 기준으로 8방향 호출 및 숫자 세팅 함수
const mineDetector = (col, index) => {
  // 깃발이나 물음표가 있으면 작동 안 함
  if (clickData[index].flag) return;
  if (clickData[index].question) return;

  // 클릭한 셀이 지뢰라면 게임 오버 처리
  if (randomMines.includes(index)) {
    gameover();
    return;
  }

  // 게임 오버나 클리어 상태면 함수 종료
  if (isGameOver || isWin) return;

  // rows.length는 '행의 개수'이고, 총 열의 수는 cols.length / rows.length
  // 현재 둘 다 9이나, 가독성과 유지보수를 위해 변수에 저장하겠다.
  const rowLength = rows.length; // 행의 개수
  const totalColumns = cols.length / rowLength; // 열의 개수
  // 클릭한 타깃 셀의 좌표 계산: (r, c)
  const r = index % rowLength; // 행 번호 (0부터 시작; 위쪽이 0)
  const c = Math.floor(index / rowLength); // 열 번호 (0부터 시작; 왼쪽이 0)

  // 클릭한 셀을 열림 상태로 표시
  cols[index].classList.add("opened");

  // 게임 클리어 체크: 남은 미개봉 셀 수가 지뢰 수와 같으면 승리
  unopenedCount = cols.length - document.querySelectorAll(".opened").length;
  if (unopenedCount === randomMines.length) {
    win();
    return;
  }

  let aroundClick = [];

  // 경계 조건을 포함하여(모서리...) 주변 셀의 index값 계산 및 저장
  aroundGap.forEach((gap) => {
    const neighborIndex = index + gap;
    // 인덱스 범위 체크 (0보다 작거나 80보다 크면 안 됨)
    if (neighborIndex < 0 || neighborIndex >= cols.length) return;

    // 각 gap에 따른 경계 조건
    // 좌측 상단 (-10): 위쪽(바로 위)와 왼쪽(바로 왼쪽)이 모두 있어야 함
    if (gap === -10 && (r === 0 || c === 0)) return;
    // 좌측 (-9): 왼쪽 열이 있어야 함
    if (gap === -9 && c === 0) return;
    // 좌측 하단 (-8): 아래쪽(바로 아래)와 왼쪽(바로 왼쪽)이 모두 있어야 함
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

    // 위의 조건을 통과한 것만 주변 셀 index로 추가
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
    // 주변에 지뢰가 없으면, 재귀적으로 주변 셀을 열기(같은 로직 적용)
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
    // 게임 오버나 클리어 상태면 함수 종료
    if (isGameOver || isWin) return;
    // 우클릭의 clickCount 상태에 따라 분기가 나뉨 (index는 우클릭 때 쓴 거랑 같으니 다행)
    if (clickData[index].flag) return;
    if (clickData[index].question) return;

    if (!isFirstClick) {
      // '첫 클릭' 때에만 일어나야 하는 것 if문 안에 넣기
      // 1. 첫 클릭 인지시키기
      isFirstClick = true;
      // 2. 첫 클릭 index 저장
      getFirstIndex();
      // 3. 지뢰 배치
      getRandomIndex(index);
      // 4. 타이머 시작
      timerStart();
    }
    // 좌클릭 시 일어나는 것 (기본)
    // 지뢰 탐지 및 숫자(8방향 지뢰 수) 배치
    mineDetector(col, index);
  });
});
