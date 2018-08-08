class Game
{
    gold:number = 0;
    clickGold:number = 1;
    tickspeed:number = 1000;
    assistants:number = 0;

    buildingCount:number = 0;
    totalProduction:number = 0;

    //percent as whole number
    factionFindChance:number = 10;
    //Angel, Fairy, Elf, Demon, Undead, Goblin
    factionCoins:number[] = new Array(0,0,0,0,0,0);

    //Cost, amount, basePower
    farms:number[] = new Array(10, 0, 2);
    inns:number[] = new Array(125, 0, 6);
    blacksmiths:number[] = new Array(600, 0, 20);
}

/**
 * On load event
 * 
 */
$(function(){
    if(localStorage.getItem("game") === null)
    {
        game = new Game();
    }
    else
    {
        game = JSON.parse(localStorage.getItem("game"));
        updateGame();
    }

    
    //Tick every ( game.tickspeed ) ms
    window.setInterval(function(){
        if (game.buildingCount > 0)
        {
            buildingTick(game.totalProduction);
        }
    }, game.tickspeed);

});
 
let game;

/**
 * Adds gold equal to game.clickDamage
 */
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

/**
 * Ticks building production ( game.tickspeed ) ms
 * @param buildingProduction Total production from all buildings
 * @event updateGame() Updates game after updating gold and faction coins
 */
function buildingTick(buildingProduction:number)
{
    game.gold += buildingProduction;
    updateGame();
}
/**
 * Buy 1 building of whichever is passed in.
 * @param building Which building you are trying to buy.
 * @event updateGame() Updates game after updating buildings and gold.
 */
//Buy buildings function
function buyBuilding(building)
{
    if (game.gold > building[0])
    {
        building[1] += 1;
        game.gold -= building[0];
        game.buildingCount+= 1;
        game.totalProduction += building[2];
        
        building[0] = Math.floor(building[0] * Math.pow(1.1, building[1]));
    }
    updateGame();
}

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
        $('#innCost').text(game.inns[0]);
        $('#innProduction').text(game.inns[2] * game.inns[1]);
    $('#blacksmiths').text(game.blacksmiths[1]);
        $('#blacksmithCost').text(game.blacksmiths[0]);
        $('#blacksmithProduction').text(game.blacksmiths[2] * game.blacksmiths[1]);
}

function updateGame()
{
    updateFactionCoins();
    updateGold();
    updateAllBuildings();

    $('#totalProduction').text(game.totalProduction);
}


function saveGame(gameState:object)
{
    localStorage.setItem("game",JSON.stringify(gameState));

}

function clearSave()
{
    localStorage.clear();
}

function loadSave()
{
    if(JSON.parse(localStorage.getItem("game")) === null)
    {
        alert("You don't have a save to load!");
    }
    else
    {
        game = JSON.parse(localStorage.getItem("game"));
        updateGame();
    }
}