"use strict";
var opponent = {
    hero: document.getElementById("rival-hero"),
    deck: document.getElementById("rival-deck"),
    field: document.getElementById("rival-cards"),
    cost: document.getElementById("rival-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById("my-hero"),
    deck: document.getElementById("my-deck"),
    field: document.getElementById("my-cards"),
    cost: document.getElementById("my-cost"),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.mine = mine;
        this.field = true;
    }
    return Hero;
}());
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.field = false;
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
        this.mine = mine;
        this.field = false;
    }
    return Sub;
}());
function isSub(data) {
    return data.cost ? true : false;
}
var turnButton = document.getElementById("turn-btn");
var turn = true; // true: 내 턴, flase: 상대 턴
function initiate() {
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    createDeck({ mine: false, count: 5 }); // 상대 덱 생성
    createDeck({ mine: true, count: 5 }); // 내 덱 생성
    createHero({ mine: false }); // 상대 영웅 그리기
    createHero({ mine: true }); // 내 영웅 그리기
    redrawScreen({ mine: false }); // 상대화면
    redrawScreen({ mine: true }); // 내화면
}
initiate();
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
function createHero(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM(player.heroData, player.hero, true);
}
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawField(player);
    redrawDeck(player);
    redrawHero(player);
}
function redrawField(target) {
    target.field.innerHTML = "";
    target.fieldData.forEach(function (data) {
        connectCardDOM(data, target.field);
    });
}
function redrawDeck(target) {
    target.deck.innerHTML = "";
    target.deckData.forEach(function (data) {
        connectCardDOM(data, target.deck);
    });
}
function redrawHero(target) {
    console.log(target);
    if (!target.heroData)
        throw new Error("heroData가 없습니다.");
    target.hero.innerHTML = "";
    connectCardDOM(target.heroData, target.hero, true);
}
function connectCardDOM(data, DOM, hero) {
    var cardEl = document.querySelector(".card-hidden .card").cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = "none";
        var name_1 = document.createElement("div");
        name_1.textContent = "영웅";
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener("click", function () {
        if (isSub(data) && data.mine === turn && !data.field) {
            if (!deckToField({ data: data })) {
                createDeck({ mine: turn, count: 1 });
            }
        }
        turnAction({ cardEl: cardEl, data: data });
    });
    DOM.appendChild(cardEl);
}
function deckToField(_a) {
    var data = _a.data;
    var target = turn ? me : opponent;
    var currentCost = Number(target.cost.textContent);
    if (currentCost < data.cost) {
        alert('코스트 모자름');
        return true;
    }
    data.field = true;
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawField(target);
    redrawDeck(target);
    target.cost.textContent = String(currentCost - data.cost);
    return false;
}
function turnAction(_a) {
    var cardEl = _a.cardEl, data = _a.data;
    var team = turn ? me : opponent; // 현재 턴의 누구
    var enemy = turn ? opponent : me; // 현재 턴의 상대
    if (cardEl.classList.contains("card-turnover"))
        return; // 턴이 끝난 카드면 아무일도 안일어남
    var enemyCard = turn ? !data.mine : data.mine;
    if (enemyCard && team.chosenCard) { // 카드 선택 후 적군 카드 클릭하여 경우 공격
        data.hp = data.hp - team.chosenCardData.att;
        if (data.hp <= 0) { // 카드가 죽었는데
            if (isSub(data)) { // 병사가 죽었을 때
                var index = enemy.fieldData.indexOf(data);
                enemy.fieldData.splice(index, 1);
            }
            else { // 영웅이 죽었을 떄
                alert("승리!");
                initiate();
            }
        }
        redrawScreen({ mine: !turn }); // 상대화면 다시 그리기
        if (team.chosenCard) { // 클릭 해제 후 상황종료
            team.chosenCard.classList.remove("card-selected");
            team.chosenCard.classList.add("card-turnover");
        }
        team.chosenCard = null;
        team.chosenCardData = null;
        return;
    }
    else if (enemyCard) {
        return;
    }
    if (data.field) { // 카드가 필드에 있는 경우
        // 영웅 부모와 필드카드의 부모가 다르기 때문에 document에서 모든 .card 검색
        document.querySelectorAll(".card").forEach(function (card) {
            card.classList.remove("card-selected");
        });
        console.log(cardEl);
        cardEl.classList.add("card-selected");
        team.chosenCard = cardEl;
        team.chosenCardData = data;
    }
}
turnButton.addEventListener("click", function () {
    var target = turn ? me : opponent;
    document.getElementById("rival").classList.toggle("turn");
    document.getElementById("my").classList.toggle("turn");
    redrawField(target);
    redrawHero(target);
    turn = !turn;
    if (turn)
        me.cost.textContent = "10";
    else
        opponent.cost.textContent = "10";
});
