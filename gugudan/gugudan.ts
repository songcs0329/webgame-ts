let numberOne = Math.ceil(Math.random() * 9)
let numberTwo = Math.ceil(Math.random() * 9)
let result = numberOne * numberTwo

const word: HTMLDivElement = document.createElement('div')
word.textContent = `${numberOne} * ${numberTwo} ?`
document.body.append(word)

const form: HTMLFormElement = document.createElement('form')
document.body.append(form)
const input: HTMLInputElement = document.createElement('input')
input.type = 'number'
const button: HTMLButtonElement = document.createElement('button')
button.textContent = 'Insert!'
form.append(input)
form.append(button)

const resultDiv: HTMLDivElement = document.createElement('div')
document.body.append(resultDiv)

const resetInput = () => {
	input.value = ''
	input.focus()
}
form.addEventListener('submit', e => {
	e.preventDefault()
	if(result === Number(input.value)) {
		resultDiv.textContent = `${numberOne} * ${numberTwo} = ${result} 정답!`
		numberOne = Math.ceil(Math.random() * 9)
		numberTwo = Math.ceil(Math.random() * 9)
		result = numberOne * numberTwo
		word.textContent = `${numberOne} * ${numberTwo} ?`
		resetInput()
	} else {
		resultDiv.textContent = '오답!'
		resetInput()
	}
})
