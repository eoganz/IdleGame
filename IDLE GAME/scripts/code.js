var Game = (function () {
    function Game() {
        this.gold = 0;
        this.clickGold = 1;
        this.farms = 0;
        this.tickSpeed = 1000;
        this.assistants = 0;
        this.factionFindChance = 10;
        this.buildingCount = 0;
        this.factionCoins = new Array(0, 0, 0, 0, 0, 0);
    }
    return Game;
}());
$(function () {
});
var game = new Game();
function goldClick() {
    var findCoin = false;
    var clickChance = Math.floor((Math.random() * 100) + 1);
    var coinDecider = Math.floor((Math.random() * 5));
    if (clickChance < game.factionFindChance) {
        game.factionCoins[coinDecider] += 1;
        updateFactionCoins();
    }
    game.gold += game.clickGold;
    $('#gold').text(game.gold);
}
function updateFactionCoins() {
    $('#angelCoins').text(game.factionCoins[0]);
    $('#fairyCoins').text(game.factionCoins[1]);
    $('#elfCoins').text(game.factionCoins[2]);
    $('#demonCoins').text(game.factionCoins[3]);
    $('#undeadCoins').text(game.factionCoins[4]);
    $('#goblinCoins').text(game.factionCoins[5]);
}
function buyFarm() {
    var farmCost = Math.floor(10 * Math.pow(1.1, game.farms));
    if (game.gold > farmCost) {
        game.farms += 1;
        game.gold -= farmCost;
        $('#farms').text(game.farms);
        $('#gold').text(game.gold);
    }
    game.buildingCount += 1;
    var nextFarmCost = Math.floor(10 * Math.pow(1.1, game.farms));
    $('#farmCost').text(nextFarmCost);
}
function test() {
    console.log(game.factionCoins);
}
window.setInterval(function () {
    if (game.farms > 0) {
        goldClick();
    }
}, game.tickSpeed);
