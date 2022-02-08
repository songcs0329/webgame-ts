"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 선언된 타입 다 만족해야함
const c = {
    hello: true,
    bye: true,
    hi: false,
};
// call, apply, 제네릭 타입선언 중요
const result = Array.prototype.map.call([1, 2, 3], (item) => {
    return item.toFixed(1);
});
const a = {
    b: true,
    c: 1,
};
const b = {
    a: "b",
    b: true,
    c: 1,
};
// 데코레이터
function makeGenders(target) {
    console.log("makeGenders");
    return class extends target {
        constructor() {
            super(...arguments);
            this.gender = "male";
        }
    };
}
function readonly(target, key) {
    console.log(target, key);
}
let Person = class Person {
    constructor(_title, _age) {
        this.title = _title;
        this.age = _age;
    }
    setTitle(_title) {
        this.title = _title;
    }
    sayTitle() {
        return this.title;
    }
};
__decorate([
    readonly
], Person.prototype, "sayTitle", null);
Person = __decorate([
    makeGenders
], Person);
const song = new Person("song", 30);
let Person2 = class Person2 {
    constructor(_title, _age) {
        this.title = _title;
        this.age = _age;
    }
    setTitle(_title) {
        this.title = _title;
    }
    sayTitle() {
        return this.title;
    }
};
Person2 = __decorate([
    makeGenders
], Person2);
