"use strict";
// type RSP = {
// 	ROCK: "0",
// 	SCISSOR: "-142px",
// 	PAPPER: "-284px",
// }
// type Hello = string | number
var imgCoords = "0";
var rsp = {
    ROCK: "0",
    SCISSORS: "-142px",
    PAPER: "-284px"
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
// keyof RSP = key값, RSP[keyof RSP] = value값
function computerChoice(imgCoords) {
    // !: 타입 리턴값이 있다는 걸 확신시켜줌(undefined, null)
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; });
    // const value = (Object.keys(rsp) as ["ROCK", "SCISSORS", "PAPER"]).find((k) => rsp[k] === imgCoords)
    // if(!value) throw new Error('nope')
    // return value
}
var interval;
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK)
            imgCoords = rsp.SCISSORS;
        else if (imgCoords === rsp.SCISSORS)
            imgCoords = rsp.PAPER;
        else if (imgCoords === rsp.PAPER)
            imgCoords = rsp.ROCK;
        // <HTMLDivElement>: 제네릭
        var computer = document.querySelector("#computer");
        // 리턴이 element | null임으로 null이 아닐 경우 분기처리
        if (computer)
            computer.style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ".concat(imgCoords, " 0");
    }, 100);
}
intervalMaker();
var point = 0;
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log(myChoice, computerChoice(imgCoords), "Draw");
        }
        else if ([-1, 2].includes(diff)) {
            console.log(myChoice, computerChoice(imgCoords), "Win");
            point++;
        }
        else {
            console.log(myChoice, computerChoice(imgCoords), "Lose");
            point--;
        }
        // as ~: 강제 형(타입) 변환
        var pointer = document.querySelector('#point');
        if (pointer)
            pointer.textContent = point.toString();
    });
});
