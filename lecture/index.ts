// intersection
interface A {
	hello: true,
}
interface B {
	bye: true,
}
type C = {
	hi: false,
}
// 선언된 타입 다 만족해야함
const c: A & B & C = {
	hello: true,
	bye: true,
	hi: false,
}

// call, apply, 제네릭 타입선언 중요
const result = Array.prototype.map.call<number[], [(item: number) => string], string[]>([1, 2, 3], (item) => {
	return item.toFixed(1)
})
// ['1.0', '2.0', '3.0']


// https://www.typescriptlang.org/docs/handbook/utility-types.html
interface Part {
	a: "b",
	b: true,
	c: 1,
}

const a: Partial<Part> = {
	b: true,
	c: 1,
}

const b: Readonly<Part> = {
	a: "b",
	b: true,
	c: 1,
}