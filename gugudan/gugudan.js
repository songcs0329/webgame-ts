var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var word = document.createElement('div');
word.textContent = "".concat(numberOne, " * ").concat(numberTwo, " ?");
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
var button = document.createElement('button');
button.textContent = 'Insert!';
form.append(input);
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
var resetInput = function () {
    input.value = '';
    input.focus();
};
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = "".concat(numberOne, " * ").concat(numberTwo, " = ").concat(result, " \uC815\uB2F5!");
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        word.textContent = "".concat(numberOne, " * ").concat(numberTwo, " ?");
        resetInput();
    }
    else {
        resultDiv.textContent = '오답!';
        resetInput();
    }
});
