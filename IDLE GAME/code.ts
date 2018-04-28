class Game
{
    gold:number = 0;
    clickGold:number = 1;
    farms:number = 0;
    tickSpeed:number = 1000;
    assistants:number = 0;

    //percent as whole number
    factionFindChance:number = 10; 
    buildingCount:number = 0;
    factionCoins:number[] = new Array(0,0,0,0,0,0);
}

$(function(){

});

let game = new Game();

//TO-DO make seperate findFactionCoin function to prevent stacking farms finding coins
function goldClick()
{
    let findCoin:boolean = false;
    let clickChance:number = Math.floor((Math.random() * 100) + 1);
    let coinDecider:number = Math.floor((Math.random() * 5 ));

    if(clickChance < game.factionFindChance)
    {
        game.factionCoins[coinDecider] += 1;
        updateFactionCoins();
    }


    game.gold += game.clickGold;
    $('#gold').text(game.gold);
}

function updateFactionCoins()
{
    $('#angelCoins').text(game.factionCoins[0]);
    $('#fairyCoins').text(game.factionCoins[1]);
    $('#elfCoins').text(game.factionCoins[2]);
    $('#demonCoins').text(game.factionCoins[3]);
    $('#undeadCoins').text(game.factionCoins[4]);
    $('#goblinCoins').text(game.factionCoins[5]);

}


function buyFarm()
{
    let farmCost = Math.floor(10 * Math.pow(1.1, game.farms));
    if (game.gold > farmCost)
    {
        game.farms += 1;
        game.gold -= farmCost;
        $('#farms').text(game.farms);
        $('#gold').text(game.gold);
    }
    game.buildingCount+= 1;
    let nextFarmCost = Math.floor(10 * Math.pow(1.1, game.farms));
    $('#farmCost').text(nextFarmCost);
}

function test()
{
    console.log(game.factionCoins);
}

// let SAVE_KEY:string = 'save';

// function saveGame(game)
// {
//     localStorage.setItem('save', JSON.stringify(game));
// }

// function load()
// {
//     return JSON.parse(localStorage.getItem(SAVE_KEY));
// }

window.setInterval(function(){
    if (game.farms > 0)
    {
        goldClick();
    }
}, game.tickSpeed);
