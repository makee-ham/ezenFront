const que = ["book", "calender", "ant", "pencil", "coffee", "remocon", "teacher"]
const ans = ["책", "달력", "개미", "연필", "커피", "리모콘", "티쳐"]
let num = 0;

function ready(){
num = Math.floor(Math.random() * que.length);
document.frm.question.value = que[num];
}

function newVoca() {
    que.push(document.new.voca.value);
    ans.push(document.new.mean.value);
    console.log(que);
    console.log(ans);
}

function result() {
    let dab = document.frm.answer.value;
    if(ans[num] == dab) {
        document.frm.msg.value = "정답입니다!!!"
    } else {
        document.frm.msg.value = "헉, 오답입니다ㅠㅜ"
    }
}

function resetRegi() {
    document.new.voca.value = "";
    document.new.mean.value = "";
}

function resetQuiz() {
    document.frm.answer.value = "";
    document.frm.msg.value = "과연 결과는?!";
}

function check () {
    document.getElementById("regiCheck").innerHTML = `${que[que.length - 1]} 등록 확인!`;
}

document.querySelector("#newQue").addEventListener('click', ready);
document.querySelector("#regi").addEventListener('click', resetRegi);
document.querySelector("#regi").addEventListener('click', check);
document.querySelector("#newQue").addEventListener('click', resetQuiz);