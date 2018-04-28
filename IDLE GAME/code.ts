class Game
{
    gold:number = 0;
    clickGold:number = 1;
    tickSpeed:number = 1000;
    assistants:number = 0;

    //percent as whole number
    factionFindChance:number = 10; 
    buildingCount:number = 0;
    factionCoins:number[] = new Array(0,0,0,0,0,0);

    //Cost, amount, basePower
    farms:number[] = new Array(10, 0, 2);
    inns:number[] = new Array(125, 0, 6);
    blacksmiths:number[] = new Array(600, 0, 20);
}

$(function(){

});

let game = new Game();

//TO-DO Find better algorithm to finding and deciding factiong coins.
function goldClick()
{
    game.gold += game.clickGold;
    let clickChance:number = Math.floor((Math.random() * 100) + 1);
    let coinDecider:number = Math.floor((Math.random() * 5 ));

    if(clickChance < game.factionFindChance)
    {
        game.factionCoins[coinDecider] += 1;
    }

    updateGame();
}

//Ticks building production ( game.tickspeed ) ms
function buildingTick(buildingProduction:number)
{
    game.gold += buildingProduction;
    updateGame();
}

//Buy farms function
function buyBuilding(building)
{
    if (game.gold > building[0])
    {
        building[1] += 1;
        game.gold -= building[0];
        game.buildingCount+= 1;
        
        building[0] = Math.floor(building[0] * Math.pow(1.12, building[1]));
    }
    updateGame();
}

//Test for displaying game.factionCoins to compare to HTML
function test()
{
    console.log(game.factionCoins);
    console.log(game.farms);
}

//Tick every ( game.tickspeed ) ms
window.setInterval(function(){
    let totalProd = getTotalProduction();
    if (totalProd > 0)
    {
        buildingTick(totalProd);
    }
}, game.tickSpeed);

//Updates faction coins <Span> tags
function updateFactionCoins()
{
    $('#angelCoins').text(game.factionCoins[0]);
    $('#fairyCoins').text(game.factionCoins[1]);
    $('#elfCoins').text(game.factionCoins[2]);
    $('#demonCoins').text(game.factionCoins[3]);
    $('#undeadCoins').text(game.factionCoins[4]);
    $('#goblinCoins').text(game.factionCoins[5]);
}

//Updates gold on page
function updateGold()
{
    $('#gold').text(game.gold);
}

function updateAllBuildings()
{
    $('#farms').text(game.farms[1]);
        $('#farmCost').text(game.farms[0]);
        $('#farmProduction').text(game.farms[2] * game.farms[1]);
    $('#inns').text(game.inns[1]);
        $('#innsCost').text(game.inns[0]);
        $('innProduction').text(game.inns[2] * game.inns[1]);
}

function updateGame()
{
    updateFactionCoins();
    updateGold();
    updateAllBuildings();

    let totalProduction = getTotalProduction();
    $('#totalProduction').text(totalProduction);
}

function getTotalProduction():number
{
    let totalProd = 0;
    if(game.farms[1] > 0)
    {
        totalProd += game.farms[2] * game.farms[1];
    }
    if(game.inns[1] > 0)
    {
        totalProd += game.inns[2] * game.inns[1];
    }
    return totalProd;
}