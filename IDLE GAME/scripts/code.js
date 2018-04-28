var Game = (function () {
    function Game() {
        this.gold = 0;
        this.clickGold = 1;
        this.tickSpeed = 1000;
        this.assistants = 0;
        this.factionFindChance = 10;
        this.buildingCount = 0;
        this.factionCoins = new Array(0, 0, 0, 0, 0, 0);
        this.farms = new Array(10, 0, 2);
        this.inns = new Array(125, 0, 6);
        this.blacksmiths = new Array(600, 0, 20);
    }
    return Game;
}());
$(function () {
});
var game = new Game();
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
        building[0] = Math.floor(building[0] * Math.pow(1.12, building[1]));
    }
    updateGame();
}
function test() {
    console.log(game.factionCoins);
    console.log(game.farms);
}
window.setInterval(function () {
    var totalProd = getTotalProduction();
    if (totalProd > 0) {
        buildingTick(totalProd);
    }
}, game.tickSpeed);
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
    $('#innsCost').text(game.inns[0]);
    $('innProduction').text(game.inns[2] * game.inns[1]);
}
function updateGame() {
    updateFactionCoins();
    updateGold();
    updateAllBuildings();
    var totalProduction = getTotalProduction();
    $('#totalProduction').text(totalProduction);
}
function getTotalProduction() {
    var totalProd = 0;
    if (game.farms[1] > 0) {
        totalProd += game.farms[2] * game.farms[1];
    }
    if (game.inns[1] > 0) {
        totalProd += game.inns[2] * game.inns[1];
    }
    return totalProd;
}
