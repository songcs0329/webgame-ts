// 객체의 경우 interface, 타입별칭(type alias)이나 유니온(union: |) 쓸땐 type
interface RSP {
	ROCK: "0",
	SCISSORS: "-142px",
	PAPER: "-284px",
}
// type RSP = {
// 	ROCK: "0",
// 	SCISSOR: "-142px",
// 	PAPPER: "-284px",
// }
// type Hello = string | number

let imgCoords: RSP[keyof RSP] = "0"
const rsp: RSP = {
	ROCK: "0",
	SCISSORS: "-142px",
	PAPER: "-284px", 
}
const score = {
	ROCK: 0,
	SCISSORS: 1,
	PAPER: -1,
} as const

// keyof RSP = key값, RSP[keyof RSP] = value값
function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
	// !: 타입 리턴값이 있다는 걸 확신시켜줌(undefined, null)
	return (Object.keys(rsp) as ["ROCK", "SCISSORS", "PAPER"]).find((k) => rsp[k] === imgCoords)!
	// const value = (Object.keys(rsp) as ["ROCK", "SCISSORS", "PAPER"]).find((k) => rsp[k] === imgCoords)
	// if(!value) throw new Error('nope')
	// return value
}

let interval: number
function intervalMaker() {
	interval = setInterval(function () {
		if(imgCoords === rsp.ROCK) imgCoords = rsp.SCISSORS
		else if(imgCoords === rsp.SCISSORS) imgCoords = rsp.PAPER
		else if(imgCoords === rsp.PAPER) imgCoords = rsp.ROCK
		// <HTMLDivElement>: 제네릭
		const computer = document.querySelector<HTMLDivElement>("#computer")
		// 리턴이 element | null임으로 null이 아닐 경우 분기처리
		if(computer) computer.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`
	}, 100)
}
intervalMaker()

let point: number = 0
document.querySelectorAll(".btn").forEach(btn => {
	btn.addEventListener("click", function(this: HTMLButtonElement) {
		clearInterval(interval)
		setTimeout(intervalMaker, 2000)
		const myChoice = this.textContent as keyof RSP
		const myScore = score[myChoice]
		const computerScore = score[computerChoice(imgCoords)]
		const diff = myScore - computerScore
		if(diff === 0) {
			console.log(myChoice, computerChoice(imgCoords), "Draw")
		} else if([-1, 2].includes(diff)) {
			console.log(myChoice, computerChoice(imgCoords), "Win")
			point++
		} else {
			console.log(myChoice, computerChoice(imgCoords), "Lose")
			point--
		}
		// as ~: 강제 형(타입) 변환
		const pointer = document.querySelector('#point') as HTMLDivElement
		if(pointer) pointer.textContent = point.toString()
	})
})