let cust = [
  ["A101", "김삿갓", "111-111-1111", true, 0, 1000000],
  ["A102", "정선달", "111-111-2222", false, 0, 500000],
  ["A103", "윤나라", "111-111-3333", false, 0, 300000],
];

// 고객등록
function regist(frm) {
  const element = [
    frm.cNo.value,
    frm.cName.value,
    frm.cNumber.value,
    frm.yesNo.checked,
    0,
    Number(frm.cLimit.value),
  ];
  cust.push(element);
  console.log(cust);
}

// 입금
function inStock(frm) {
  let num = frm.cNo.value;
  for (i = 0; i < cust.length; i++) {
    if (cust[i][0] == num) {
      break;
    }
  }
  if (i < cust.length) {
    cust[i][4] += Number(frm.incost.value);
  } else {
    alert("해당 고객이 존재하지 않습니다");
  }
  console.log(cust);
}

// 출금
function outStock(frm) {
  let num = frm.cNo.value;
  for (i = 0; i < cust.length; i++) {
    if (cust[i][0] == num) {
      break;
    }
  }
  if (cust[i][4] < Number(frm.outcost.value) && cust[i][3] == false) {
    alert("잔액이 부족하여 인출할 수 없습니다");
  } else {
    cust[i][4] -= Number(frm.outcost.value);
  }
  console.log(cust);
}

// 카드결제
function appr(frm) {
  let num = frm.cNo.value;
  for (i = 0; i < cust.length; i++) {
    if (cust[i][0] == num) {
      break;
    }
  }
  if (cust[i][5] < Number(frm.approval.value)) {
    alert("한도초과");
  } else {
    apprt = cust[i][5] - Number(frm.approval.value);
    cust[i][5] -= Number(frm.approval.value);
    alert("결재액" + frm.approval.value + "\n" + "남은 한도" + cust[i][5]);
  }
}
