var body = document.body;
var candidate;
var array = [];
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (var i = 0; i < 4; i++) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}
chooseNumber();
console.log(array);
var result = document.createElement("h1");
body.append(result);
var form = document.createElement("form");
body.append(form);
var input = document.createElement("input");
form.append(input);
input.type = "text";
input.maxLength = 4;
var button = document.createElement("button");
button.textContent = "입력";
form.append(button);
function restartGame() {
    input.value = "";
    input.focus();
    chooseNumber();
    wrongCount = 0;
}
function checkGameCount(answer) {
    var answerArr = answer.split("");
    var strike = 0;
    var ball = 0;
    for (var i = 0; i < 4; i++) {
        if (Number(answer[i]) === array[i]) {
            console.log("같은 자리?");
            strike++;
        }
        else if (array.indexOf(Number(answerArr[i])) > -1) {
            console.log("겹치는 숫자?");
            ball++;
        }
    }
    return {
        strike: strike,
        ball: ball
    };
}
var wrongCount = 0;
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var answer = input.value;
    if (answer === array.join("")) {
        result.textContent = "".concat(answer.split(""), " \uD648\uB7F0!");
        restartGame();
    }
    else {
        if (wrongCount > 9) {
            result.textContent = "10\uBC88 \uB118\uAC8C \uD2C0\uB824\uC11C \uC2E4\uD328 \uB2F5\uC740 ".concat(array.join(','));
            restartGame();
        }
        else {
            var currentCount = checkGameCount(answer);
            console.log(currentCount);
            var strike = currentCount.strike, ball = currentCount.ball;
            input.value = "";
            input.focus();
            wrongCount++;
            result.textContent = "".concat(strike, "\uC2A4\uD2B8\uB77C\uC774\uD06C ").concat(ball, "\uBCFC \uC785\uB2C8\uB2E4. \uD2C0\uB9B0\uD69F\uC218").concat(wrongCount);
        }
    }
});
