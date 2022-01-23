const { body } = document
let candidate: number[]
let array: number[] =  []

function chooseNumber() {
	candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	array = []
	for(let i: number  = 0; i < 4; i++) {
		const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
		array.push(chosen)
	}	
}

chooseNumber()
console.log(array)

const result = document.createElement("h1")
body.append(result)
const form = document.createElement("form")
body.append(form)
const input = document.createElement("input")
form.append(input)
input.type = "text"
input.maxLength = 4
const button = document.createElement("button")
button.textContent = "입력"
form.append(button)

function restartGame() {
	input.value = ""
	input.focus()
	chooseNumber()
	wrongCount = 0
}

interface gameCount {
	strike: number,
	ball: number
}

function checkGameCount(answer: string): gameCount {
	const answerArr = answer.split("")
	let strike = 0
	let ball = 0
	for(let i: number = 0; i < 4; i++) {
		if(Number(answer[i]) === array[i]) {
			console.log("같은 자리?")
			strike++
		} else if(array.indexOf(Number(answerArr[i])) > -1) {
			console.log("겹치는 숫자?")
			ball++
		}
	}
	return {
		strike,
		ball
	}
}

let wrongCount = 0
form.addEventListener("submit", e => {
	e.preventDefault()
	const answer = input.value
	if(answer === array.join("")) {
		result.textContent = `${answer.split("")} 홈런!`
		restartGame()
	} else {
		if(wrongCount > 9) {
			result.textContent = `10번 넘게 틀려서 실패 답은 ${array.join(',')}`
			restartGame()
		} else {
			const currentCount = checkGameCount(answer)
			console.log(currentCount)
			const { strike, ball } = currentCount
			input.value = ""
			input.focus()
			wrongCount++
			result.textContent = `${strike}스트라이크 ${ball}볼 입니다. 틀린횟수${wrongCount}`
		}
	}
})
