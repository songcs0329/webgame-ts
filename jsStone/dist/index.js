/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar opponent = {\n    hero: document.getElementById(\"rival-hero\"),\n    deck: document.getElementById(\"rival-deck\"),\n    field: document.getElementById(\"rival-cards\"),\n    cost: document.getElementById(\"rival-cost\"),\n    deckData: [],\n    heroData: null,\n    fieldData: [],\n    chosenCard: null,\n    chosenCardData: null,\n};\nvar me = {\n    hero: document.getElementById(\"my-hero\"),\n    deck: document.getElementById(\"my-deck\"),\n    field: document.getElementById(\"my-cards\"),\n    cost: document.getElementById(\"my-cost\"),\n    deckData: [],\n    heroData: null,\n    fieldData: [],\n    chosenCard: null,\n    chosenCardData: null,\n};\nvar Hero = /** @class */ (function () {\n    function Hero(mine) {\n        this.att = Math.ceil(Math.random() * 2);\n        this.hp = Math.ceil(Math.random() * 5) + 25;\n        this.mine = mine;\n        this.field = true;\n    }\n    return Hero;\n}());\nvar Sub = /** @class */ (function () {\n    function Sub(mine) {\n        this.field = false;\n        this.att = Math.ceil(Math.random() * 5);\n        this.hp = Math.ceil(Math.random() * 5);\n        this.cost = Math.floor((this.att + this.hp) / 2);\n        this.mine = mine;\n        this.field = false;\n    }\n    return Sub;\n}());\nfunction isSub(data) {\n    return data.cost ? true : false;\n}\nvar turnButton = document.getElementById(\"turn-btn\");\nvar turn = true; // true: ??? ???, flase: ?????? ???\nfunction initiate() {\n    [opponent, me].forEach(function (item) {\n        item.deckData = [];\n        item.heroData = null;\n        item.fieldData = [];\n        item.chosenCard = null;\n        item.chosenCardData = null;\n    });\n    createDeck({ mine: false, count: 5 }); // ?????? ??? ??????\n    createDeck({ mine: true, count: 5 }); // ??? ??? ??????\n    createHero({ mine: false }); // ?????? ?????? ?????????\n    createHero({ mine: true }); // ??? ?????? ?????????\n    redrawScreen({ mine: false }); // ????????????\n    redrawScreen({ mine: true }); // ?????????\n}\ninitiate();\nfunction createDeck(_a) {\n    var mine = _a.mine, count = _a.count;\n    var player = mine ? me : opponent;\n    for (var i = 0; i < count; i++) {\n        player.deckData.push(new Sub(mine));\n    }\n    redrawDeck(player);\n}\nfunction createHero(_a) {\n    var mine = _a.mine;\n    var player = mine ? me : opponent;\n    player.heroData = new Hero(mine);\n    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });\n}\nfunction redrawScreen(_a) {\n    var mine = _a.mine;\n    var player = mine ? me : opponent;\n    redrawField(player);\n    redrawDeck(player);\n    redrawHero(player);\n}\nfunction redrawField(target) {\n    target.field.innerHTML = \"\";\n    target.fieldData.forEach(function (data) {\n        connectCardDOM({ data: data, DOM: target.field });\n    });\n}\nfunction redrawDeck(target) {\n    target.deck.innerHTML = \"\";\n    target.deckData.forEach(function (data) {\n        connectCardDOM({ data: data, DOM: target.deck });\n    });\n}\nfunction redrawHero(target) {\n    console.log(target);\n    if (!target.heroData)\n        throw new Error(\"heroData??? ????????????.\");\n    target.hero.innerHTML = \"\";\n    connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });\n}\nfunction connectCardDOM(_a) {\n    var data = _a.data, DOM = _a.DOM, _b = _a.hero, hero = _b === void 0 ? false : _b;\n    var cardEl = document.querySelector(\".card-hidden .card\").cloneNode(true);\n    cardEl.querySelector('.card-att').textContent = String(data.att);\n    cardEl.querySelector('.card-hp').textContent = String(data.hp);\n    if (hero) {\n        cardEl.querySelector('.card-cost').style.display = \"none\";\n        var name_1 = document.createElement(\"div\");\n        name_1.textContent = \"??????\";\n        cardEl.appendChild(name_1);\n    }\n    else {\n        cardEl.querySelector('.card-cost').textContent = String(data.cost);\n    }\n    cardEl.addEventListener(\"click\", function () {\n        if (isSub(data) && data.mine === turn && !data.field) {\n            if (!deckToField({ data: data })) {\n                createDeck({ mine: turn, count: 1 });\n            }\n        }\n        turnAction({ cardEl: cardEl, data: data });\n    });\n    DOM.appendChild(cardEl);\n}\nfunction deckToField(_a) {\n    var data = _a.data;\n    var target = turn ? me : opponent;\n    var currentCost = Number(target.cost.textContent);\n    if (currentCost < data.cost) {\n        alert('????????? ?????????');\n        return true;\n    }\n    data.field = true;\n    var idx = target.deckData.indexOf(data);\n    target.deckData.splice(idx, 1);\n    target.fieldData.push(data);\n    redrawField(target);\n    redrawDeck(target);\n    target.cost.textContent = String(currentCost - data.cost);\n    return false;\n}\nfunction turnAction(_a) {\n    var cardEl = _a.cardEl, data = _a.data;\n    var team = turn ? me : opponent; // ?????? ?????? ??????\n    var enemy = turn ? opponent : me; // ?????? ?????? ??????\n    if (cardEl.classList.contains(\"card-turnover\"))\n        return; // ?????? ?????? ????????? ???????????? ????????????\n    var enemyCard = turn ? !data.mine : data.mine;\n    if (enemyCard && team.chosenCard) { // ?????? ?????? ??? ?????? ?????? ???????????? ?????? ??????\n        data.hp = data.hp - team.chosenCardData.att;\n        if (data.hp <= 0) { // ????????? ????????????\n            if (isSub(data)) { // ????????? ????????? ???\n                var index = enemy.fieldData.indexOf(data);\n                enemy.fieldData.splice(index, 1);\n            }\n            else { // ????????? ????????? ???\n                alert(\"\".concat(turn ? \"???\" : \"???\", \" \\uC2B9\\uB9AC!\"));\n                initiate();\n            }\n        }\n        redrawScreen({ mine: !turn }); // ???????????? ?????? ?????????\n        if (team.chosenCard) { // ?????? ?????? ??? ????????????\n            team.chosenCard.classList.remove(\"card-selected\");\n            team.chosenCard.classList.add(\"card-turnover\");\n        }\n        team.chosenCard = null;\n        team.chosenCardData = null;\n        return;\n    }\n    else if (enemyCard) {\n        return;\n    }\n    if (data.field) { // ????????? ????????? ?????? ??????\n        // ?????? ????????? ??????????????? ????????? ????????? ????????? document?????? ?????? .card ??????\n        document.querySelectorAll(\".card\").forEach(function (card) {\n            card.classList.remove(\"card-selected\");\n        });\n        console.log(cardEl);\n        cardEl.classList.add(\"card-selected\");\n        team.chosenCard = cardEl;\n        team.chosenCardData = data;\n    }\n}\nturnButton.addEventListener(\"click\", function () {\n    var target = turn ? me : opponent;\n    document.getElementById(\"rival\").classList.toggle(\"turn\");\n    document.getElementById(\"my\").classList.toggle(\"turn\");\n    redrawField(target);\n    redrawHero(target);\n    turn = !turn;\n    if (turn)\n        me.cost.textContent = \"10\";\n    else\n        opponent.cost.textContent = \"10\";\n});\n\n\n\n//# sourceURL=webpack://jsstone/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;