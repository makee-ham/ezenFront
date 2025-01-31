// 생각

// draggable 영역 위에서 마우스를 누르고 이동한 뒤 마우스를 떼면
// 그 거리만큼 요소들이 이동하고(정확히는 dragList가)
// 드래그 할 시에 애니메이션 효과는 일어나지 아니하며
// 그냥 클릭할 때에는 원래 효과가 일어난다

// + dragContainer가 화면 밖으로 넘어가지 않게 하려면?

////////////////////////////////////

// 가져올 거 가져오기
const body = document.querySelector("body");

const container = document.querySelector(".dragContainer");
const dragList = document.querySelector(".dragList");
const items = document.querySelectorAll(".items");

////////////////////////////////////
// 1차 시도 (250131)

// 일단 영역을 선택해보자.
// dragList가 화면에서 위치한 영역을 선택해야 하나?
const rect = dragList.getBoundingClientRect();
// console.log(rect);

// 차근차근... 해당 영역을 클릭했는지 확인하는 거부터 해보자.
body.addEventListener("click", clickBodyEvent);

function clickBodyEvent(e) {
  let target = e.target; // 이러면 클릭한 요소의 html이 반환됨!
  // console.log(target);

  let currentTarget = e.currentTarget; // 엥 이러니까 body 전체 html이 반환됨 뭐지;;
  // console.log(currentTarget);

  // 아하 그러니까 지금 body에 이벤트 리스너를 달아줬으니까
  // .target은 '이벤트가 발생한 해당 요소'
  // .currentTarget은 '이벤트 리스너를 달아둔, 이벤트가 발생할 수 있는 요소'
  // 를 뜻하는 것 같다.

  // 그렇다면, dragList 영역에 이걸 적용할 수 있지 않을까?
}

// 가보자고
dragList.addEventListener("click", clickDragListEvent);

function clickDragListEvent(e) {
  let target = e.target; // 마찬가지로 dragList 영역 내에서 클릭한 요소의 html이 반환됨!
  // console.log(target);

  let currentTarget = e.currentTarget; // dragList의 html이 반환됨!
  // console.log(currentTarget);

  // 그렇다면, e.currentTarget의 값이 반환될 때 영역 안에 있는 거겠네...
  // '영역 안에서' 'mousedown' 후 5px 정도 이상 'drag'하면 drag event 발생으로 치고...
  // 'mouseup'했을 때 dragList 이동 멈추도록...

  // 아 잠깐 그럼 .dragContainer 안에서 클릭하는 게 맞지 않나?
  // ㄱㄱㄱㄱㄱㄱ
}

// 영역 안이면 true, 밖이면 false... 이게 될까?
container.addEventListener("click", isInside);

function isInside(e) {
  let check = e.currentTarget;

  // if (check) {
  //   console.log(true);
  // } else {
  //   console.log(false); // 허미; 안 되네 어카지;; 어카지
  // }

  // .value를 덧붙일 수 있음을 알았다.
  // if (check.value) {
  //   console.log(true);
  // } else {
  //   console.log(false);
  // }
  // 아주 이랬더니 그냥 false만 주야장천 나온다.

  // console.log(check.value);
  // ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ .value 하면 undefined잖아ㅋㅋㅋㅋㅋㅋㅋㅋㅋ

  // 아 찾아보니까 "The currentTarget property is read-only."
  // https://www.w3schools.com/jsref/event_currenttarget.asp
  // 애초에 읽기 전용 값이라 안 되는 거였음;;
}

// 그러면 .currentTarget 리턴 값으로 true와 false로 나누어 if문을 나누려던 나의 계획은 망한 건가?

// 일단 container 안에서 드래그 값을 계산하는 것부터 해볼까
// 이벤트 리스너 종류: https://yoonjong-park.tistory.com/entry/addEventListener-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%A2%85%EB%A5%98

// 리스너 중에 drag는 없으니까 drag를 정의해줘야 할 것 같음
// drag란 mousedown한 상태에서 절대값('abs'olute) 5px만큼을 이동한 거란다.. 라고 알려주자

// 일단 이벤트 안에 뭐가 들었는지 좀 보자
// function wtfIsEvent(e) {
//   console.log(e);
// }

// container.addEventListener("click", wtfIsEvent);

// 아하, 저 중에 'movementX' 값으로, mousedown한 채로 드래그한 정도를 알 수 있지 않을까?

// function howMuchXDragged(e) {
//   let howMuchX = e.movementX;
//   console.log(howMuchX);
// }

// container.addEventListener("mousedown", howMuchXDragged);

// 응 역시 안 돼
// 찾아보니 'mousemove'에만 값이 오르는 거였다
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX

// 그럼 드래그 이벤트를 대체 어떻게 감지하지??
// 1. mousedown 이벤트 발생 후 (e.type === "mousedown"???)
// 2. 커서의 좌표가 바뀐다, 특히 offsetX? // 여기까지가 드래그 시작과 중간
// https://mong-blog.tistory.com/entry/clientX-offsetX-pageX-screenX-%EC%B0%A8%EC%9D%B4
// 3. mouseup 이벤트 발생 시 // 이게 드래그 끝

// function howMuchXMoved(e) {
//   while (e.type === "mousedown") {
//     // 아 작동 순간엔 mousedown이었으니까 무한루프로 가는구나;;
//     console.log(e.movementX);
//     if (e.type === "mouseup") break;
//   }
// }

// mousemove인 동안만  작동할 수는 없나?
// 그러니까 시발점은 mousedown인데, 이후 mousemove가 일어나면... 응...

// 찾아보니 실시간으로 마우스이벤트의 type을 감지하는 방법은 안 보이네...

// let type;

// const eventTypeChecker = (e) => (type = e.type);

// const checkerOn = function () {
//   while (type === "mousedown") {
//     setInterval(eventTypeChecker, 500);
//     console.log(type);
//   }
// };

// c.addEventListener("mousedown", checkerOn);

// 아 맞다 제이쿼리는 실시간이 됐잖아 그럼 document ready function을 바닐라로... 해보자...
