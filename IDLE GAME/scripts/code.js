var Game = (function () {
    function Game() {
        this.gold = 0;
        this.clickGold = 1;
        this.tickspeed = 1000;
        this.assistants = 0;
        this.buildingCount = 0;
        this.totalProduction = 0;
        this.factionFindChance = 10;
        this.factionCoins = new Array(0, 0, 0, 0, 0, 0);
        this.farms = new Array(10, 0, 2);
        this.inns = new Array(125, 0, 6);
        this.blacksmiths = new Array(600, 0, 20);
    }
    return Game;
}());
$(function () {
    if (localStorage.getItem("game") === null) {
        game = new Game();
    }
    else {
        game = JSON.parse(localStorage.getItem("game"));
        updateGame();
    }
    window.setInterval(function () {
        if (game.buildingCount > 0) {
            buildingTick(game.totalProduction);
        }
    }, game.tickspeed);
});
var game;
function goldClick() {
    game.gold += game.clickGold;
    var clickChance = Math.floor((Math.random() * 100) + 1);
    var coinDecider = Math.floor((Math.random() * 5));
    if (clickChance < game.factionFindChance) {
        game.factionCoins[coinDecider] += 1;
    }
    updateGame();
}
function buildingTick(buildingProduction) {
    game.gold += buildingProduction;
    updateGame();
}
function buyBuilding(building) {
    if (game.gold > building[0]) {
        building[1] += 1;
        game.gold -= building[0];
        game.buildingCount += 1;
        game.totalProduction += building[2];
        building[0] = Math.floor(building[0] * Math.pow(1.1, building[1]));
    }
    updateGame();
}
function updateFactionCoins() {
    $('#angelCoins').text(game.factionCoins[0]);
    $('#fairyCoins').text(game.factionCoins[1]);
    $('#elfCoins').text(game.factionCoins[2]);
    $('#demonCoins').text(game.factionCoins[3]);
    $('#undeadCoins').text(game.factionCoins[4]);
    $('#goblinCoins').text(game.factionCoins[5]);
}
function updateGold() {
    $('#gold').text(game.gold);
}
function updateAllBuildings() {
    $('#farms').text(game.farms[1]);
    $('#farmCost').text(game.farms[0]);
    $('#farmProduction').text(game.farms[2] * game.farms[1]);
    $('#inns').text(game.inns[1]);
    $('#innCost').text(game.inns[0]);
    $('#innProduction').text(game.inns[2] * game.inns[1]);
    $('#blacksmiths').text(game.blacksmiths[1]);
    $('#blacksmithCost').text(game.blacksmiths[0]);
    $('#blacksmithProduction').text(game.blacksmiths[2] * game.blacksmiths[1]);
}
function updateGame() {
    updateFactionCoins();
    updateGold();
    updateAllBuildings();
    $('#totalProduction').text(game.totalProduction);
}
function saveGame(gameState) {
    localStorage.setItem("game", JSON.stringify(gameState));
}
function clearSave() {
    localStorage.clear();
}
function loadSave() {
    if (JSON.parse(localStorage.getItem("game")) === null) {
        alert("You don't have a save to load!");
    }
    else {
        game = JSON.parse(localStorage.getItem("game"));
        updateGame();
    }
}
