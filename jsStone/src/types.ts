export interface Player {
	hero: HTMLDivElement,
	deck: HTMLDivElement,
	field: HTMLDivElement,
	cost: HTMLDivElement,
	deckData: Sub[],
	heroData?: Hero | null,
	fieldData: Sub[],
	chosenCard?: HTMLDivElement | null,
	chosenCardData?: Card | null
}
export interface Card {
	att: number,
	hp: number,
	mine: boolean,
	cost?: number,
	field?: boolean,
}
export interface CardDOM {
	data: Card,
	DOM: HTMLDivElement,
	hero? : boolean
}

export class Hero implements Card {
	att: number;
	hp: number;
	mine: boolean;
	field: true;
	constructor(mine: boolean) {
		this.att = Math.ceil(Math.random() * 2)
		this.hp = Math.ceil(Math.random() * 5) + 25
		this.mine = mine
		this.field = true
	}
}
export class Sub implements Card {
	att: number;
	hp: number;
	field: boolean;
	cost: number;
	mine: boolean;
	constructor(mine: boolean) {
		this.att = Math.ceil(Math.random() * 5)
		this.hp = Math.ceil(Math.random() * 5)
		this.cost = Math.floor((this.att + this.hp) / 2)
		this.mine = mine
		this.field = false
	}
}