var canvas;
var canvasContext;
var endBattle = false;
var startBattle = false;
var grass1 = document.getElementById("grass1");
var grass1Location = grass1.getBoundingClientRect();

var grass2 = document.getElementById("grass2");
var grass2Location = grass2.getBoundingClientRect();

var grass3 = document.getElementById("grass3");
var grass3Location = grass2.getBoundingClientRect();

var pokeBattle = document.createElement("audio");
pokeBattle.src = "soundsFx/battle_wild_pokemon.mp3";
pokeBattle.volume = 0.7;
pokeBattle.autoplay = false;
pokeBattle.preLoad = true;
pokeBattle.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
pokeBattle.pause();
var wildPokemon = Math.floor(Math.random() * 3);
window.onload = function(){
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle = "#78AB46";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    battle();
}
function battle(){    
    $(this).keydown(function(e){
    if(e.which == 37){
        $('#trainer').stop(true).animate({left: '-=20px'});
    }
    else if(e.which == 38){
        $('#trainer').stop(true).animate({top: '-=20px'});

    }
    else if(e.which == 39){
        $('#trainer').stop(true).animate({left: '+=20px'});

    }
    else if(e.which == 40){
        $('#trainer').stop(true).animate({top: '+=20px'});

    }
    var trainer = document.getElementById("trainer");
    var trainerLocation = trainer.getBoundingClientRect();
    var trainerX = trainerLocation.left;
    var trainerY = trainerLocation.top;
    if(trainerX >= (grass1Location.left + 5) && trainerX <= (grass1Location.left + (grass1Location.width * 2) - 5)){
        if(trainerY >= (grass1Location.top + 5) && trainerY <= (grass1Location.top + grass1Location.height - 5)){
            startBattle = true;
            console.log(startBattle);
            $("#trainer").fadeOut(3000);
            $("#background").fadeOut(3000);
            pokeBattle.play();
            $("#main-container").fadeIn("slow");
            $("#refresh").fadeIn("slow");
        }
    }
    else if(trainerX >= (grass2Location.left + 5) && trainerX <= (grass2Location.left + (grass2Location.width * 2) - 5)){
        if(trainerY >= (grass2Location.top + 5) && trainerY <= (grass2Location.top + grass2Location.height - 5)){
            startBattle = true;
            $("#trainer").fadeOut(3000);
            $("#background").fadeOut(3000);
            pokeBattle.play();
            $("#main-container").fadeIn("slow");
            $("#refresh").fadeIn("slow");
        }
    }
    else if(trainerX >= (grass3Location.left + 5) && trainerX <= grass3Location.left + (grass3Location.width - 5)){
        if(trainerY >= (grass3Location.top + 5) && trainerY <= (grass3Location.top + grass3Location.height - 5)){
            startBattle = true;

            $("#trainer").fadeOut(3000);
            $("#background").fadeOut(3000);
            pokeBattle.play();
            $("#main-container").fadeIn("slow");
            $("#refresh").fadeIn("slow");
        }
    }
});
}
var charmander = {
    name: "Charmander",
    health: 100,
    lvl: 6,
    effect: null,
    physDefence: 30,
    specDefence: 40,
    moves: [{
        name:"ember",
        type: "special",
        power: 40,
        accuracy: 1,
        PP: 25,
        criticalChance: 0.15 
    },
        {
        name:"tackle",
        type: "physical",
        power: 20,
        accuracy: 1,
        PP: 25,
        criticalChance: 0.1
    },
        {
        name:"growl",
        type: "status",
        power: 0.25,
        accuracy: 0.8,
        PP: 40,
        criticalChance: -1
    },
    {
        name:"scratch",
        type: "physical",
        power: 30,
        accuracy: 0.5,
        PP: 30,
        criticalChance: 0.2
    }]
};
var pikachu = {
    name: "Pikachu",
    health: 100,
    lvl: 8,
    effect: null,
    physDefence: 40,
    specDefence: 25,
    moves: [
        {
        name:"thunder-shock",
        type: "special",
        power: 33,
        accuracy: 0.8,
        PP: 15,
        criticalChance: 0.15
    },
    {
        name:"tackle",
        type: "physical",
        power: 20,
        accuracy: 1,
        PP: 25,
        criticalChance: 0.1
    },
    {
        name:"tail whip",
        type: "status",
        power: 0.30,
        accuracy: 0.9,
        PP: 10,
        criticalChance: -1
    },
    {
        name:"scratch",
        type: "physical",
        power: 30,
        accuracy: 0.5,
        PP: 30,
        criticalChance: 0.2
    }]
};

var currentState;
var cpuPokemon;
var userPokemon;

var cpuTurn = {
    play: function () {
        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];

        var setUpCPUField = function () {
            $("#chat-text").text("What will " + cpuPokemon.name + " do?");
            attackAnimation();
        };

        var attackAnimation = function () {
            $(".pika").animate({
                top: "-=1em",
            }, 250, function() {
                $(".pika").animate({
                top: "+=1em",
            }, 250)
            });
            getAccuracy();

        };
        var getAccuracy = function(){
            var setAccuracy = Math.random();
            if (setAccuracy <= currentCPUMove.accuracy){
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                if(currentCPUMove.name == "tail whip"){
                    $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!" + " " + userPokemon.name + "'s defence was lowered!");
                if(userPokemon.name.length >= 8){
                    userPokemon.name = userPokemon.name.substring(0,4).toUpperCase();
                     $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!" + " " + userPokemon.name + "'s defence was lowered!");
                     currentState = playerTurn;
                     setTimeout(loop, 1500)
                }
                }
                getMoveType();
            }
            else{
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + ", but it missed.");
                var ma = document.createElement("audio");                
                ma.src="soundsFx/missAttk.mp3";
                ma.volume=0.70;
                ma.autoPlay=false;
                ma.preLoad=true;       
                ma.play();
                currentState = playerTurn;
                setTimeout(loop, 1500)
            }
        };
        var getMoveType = function(){
            showMoveAnimation();
            var obj = document.createElement("audio");
            if(currentCPUMove.type == "physical"){
                    obj.src="soundsFx/attack.mp3";
                    obj.volume=0.70;
                    obj.autoPlay=false;
                    obj.preLoad=true;
                    obj.play();    
                setTimeout(attackingMove, 1500);    
            }
            else if(currentCPUMove.type == "special"){
                    obj.src="soundsFx/attack.mp3";
                    obj.volume=0.70;
                    obj.autoPlay=false;
                    obj.preLoad=true;
                    obj.play();    
                setTimeout(attackingMove, 1500);
            }
            else if(currentCPUMove.type == "status"){
                     obj.src="soundsFx/statuseffectFx.mp3";
                     obj.volume=0.70;
                     obj.autoPlay=false;
                     obj.preLoad=true;       
                     obj.play();
                setTimeout(defensiveMove, 1500);
            }
        };
        var showMoveAnimation = function () {
            $("#attack-img").addClass("cpu-attack");
            $("#attack-img").removeClass("hide");
            $("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
        };
        var attackingMove = function(){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack");
            var criticalStrike = Math.random();
            if((currentCPUMove.criticalChance * 5) >= criticalStrike || currentCPUMove.criticalChance == -1){
            if (!cpuPokemon.effect){
                userPokemon.health -= currentCPUMove.power;

            }else if(cpuPokemon.effect == 0.25)
            {
                userPokemon.health -= (currentCPUMove.power)-(currentCPUMove.power * cpuPokemon.effect);
                cpuPokemon.effect = null;
            }
            else if(cpuPokemon.effect == 0.3){
                userPokemon.health -= (currentCPUMove.power)+(currentCPUMove.power * cpuPokemon.effect);
                cpuPokemon.effect = null;
            }
            $("#user-health-bar").css("width", userPokemon.health + "%");
            currentState = playerTurn;
            loop();
        }
        else{
            if (!cpuPokemon.effect){
                userPokemon.health -= currentCPUMove.power * 2;
            }else if(cpuPokemon.effect == 0.25)
            {
                userPokemon.health -= (currentCPUMove.power * 2)-(currentCPUMove.power * cpuPokemon.effect);
                cpuPokemon.effect = null;
            }
            else if(cpuPokemon.effect == 0.3){
                userPokemon.health -= (currentCPUMove.power * 2)+(currentCPUMove.power * cpuPokemon.effect);
                cpuPokemon.effect = null;

            }
            $("#chat-text").text("The enemy " + cpuPokemon.name + " critically hit!!!");
            $("#user-health-bar").css("width", userPokemon.health + "%");
            currentState = playerTurn;
            loop();
        }
    };
        var defensiveMove = function (){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack");
            userPokemon.effect = currentCPUMove.power
            currentState = playerTurn;
            loop();
        };
        setUpCPUField();
    }
};
var playerTurn = {
    play: function(){
        var currentUserMove;
        var setUpUserField = function () {
            var moveButtons = [".move1-text", ".move2-text", ".move3-text", ".move4-text"];
            $(".user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?");
            
            for(var i = moveButtons.length - 1; i >= 0; i--){
                $(moveButtons[i]).text(userPokemon.moves[i].name);
            };
        };

        var prepareToAttack = function () {
            $(".user-buttons").addClass("hide")
            $(".charmander").animate({
                left: "+=1em",
            }, 250, function() {
                $(".charmander").animate({
                left: "-=1em",
            }, 250)
            });
            getAccuracy();

        };
        var getAccuracy = function(){
            var setAccuracy = Math.random();
            if (setAccuracy <= currentUserMove.accuracy){
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                if(currentUserMove.name == "tail whip"){
                    $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!" + " " + cpuPokemon.name + "'s defence was lowered!");
                if(cpuPokemon.name.length >= 8){
                    cpuPokemon.name = cpuPokemon.name.substring(0,4).toUpperCase();
                     $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!" + " " + cpuPokemon.name + "'s defence was lowered!");
                }
                }
                getMoveType();
            }
            else{
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + ", but it missed.");
                var ma = document.createElement("audio");
                ma.src="soundsFx/missAttk.mp3";
                ma.volume=0.70;
                ma.autoPlay=false;
                ma.preLoad=true;       
                ma.play();
                currentState = cpuTurn;
                setTimeout(loop, 1500)
            }
        };
         var getMoveType = function(){
            showMoveAnimation();
            var obj = document.createElement("audio");   
            if(currentUserMove.type == "physical"){
                    obj.src="soundsFx/attack.mp3";
                    obj.volume=0.70;
                    obj.autoPlay=false;
                    obj.preLoad=true;           
                    $(document).on('click', '.playSound', function() {
                    obj.play();
            });
                setTimeout(attackingMove, 1500);    
            }
            else if(currentUserMove.type == "special"){
            obj.src="soundsFx/scratch.mp3";
            obj.volume=0.70;
            obj.autoPlay=false;
            obj.preLoad=true;      
            $(document).on('click', '.playSoundSA', function() {
                obj.play();
            });                
            setTimeout(attackingMove, 1500);
            }
            else if(currentUserMove.type == "status"){
            obj.src="soundsFx/statuseffectFx.mp3";
            obj.volume=0.70;
            obj.autoPlay=false;
            obj.preLoad=true;       
            obj.play();
            $(document).on('click', '.playSoundSE', function() {
                obj.play();
            });
                setTimeout(defensiveMove, 1500);
            }
        };
        var showMoveAnimation = function () {
            $("#attack-img").addClass("user-attack");
            $("#attack-img").removeClass("hide");
            $("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
        };
        var attackingMove = function(){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack");
            var criticalStrike = Math.random();
            if((currentUserMove.criticalChance * 5) >= criticalStrike || currentUserMove.criticalChance == -1){
            if (!userPokemon.effect){
                cpuPokemon.health -= currentUserMove.power;

            }
            else if(userPokemon.effect == 0.25){
                cpuPokemon.health -= (currentUserMove.power)-(currentUserMove.power * userPokemon.effect);
                userPokemon.effect = null;
            }
            else if(userPokemon.effect == 0.3){
                cpuPokemon.health -= (currentUserMove.power)+(currentUserMove.power * userPokemon.effect);
                userPokemon.effect = null;
            }
            $("#enemy-health-bar").css("width", cpuPokemon.health + "%");
            currentState = cpuTurn;
            loop();
        }
        else{
            if (!userPokemon.effect){
                cpuPokemon.health -= currentUserMove.power * 2;

            }else if(userPokemon.effect == 0.25)
            {
                cpuPokemon.health -= (currentUserMove.power * 2)-(currentUserMove.power * userPokemon.effect);
                userPokemon.effect = null;

            }
            else if(userPokemon.effect == 0.3){
                cpuPokemon.health -= (currentUserMove.power * 2)+(currentUserMove.power * userPokemon.effect);
                userPokemon.effect = null;

            }
            $("#chat-text").text("Your " + userPokemon.name + " critically hit!!!");
            $("#enemy-health-bar").css("width", cpuPokemon.health + "%");
            currentState = cpuTurn;
            loop();

        }
    };
        var defensiveMove = function (){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack");
            cpuPokemon.effect = currentUserMove.power
            currentState = cpuTurn;
            loop();
        };
        $(".move1-button, .move2-button, .move3-button, .move4-button").unbind().click(function (){
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            prepareToAttack();
        });
        setUpUserField();
    }
};
var loop = function(){
    if(userPokemon.health <= 0){
        endBattle = true;
        if(endBattle){
        $("#lose-battle").removeClass("hide");
        pokeBattle.pause();
    }
    }
    else if(cpuPokemon.health <= 0){
        endBattle = true;
        if(endBattle){
        $("#trainer").fadeIn(3000);
        $("#background").fadeIn(3000);
        $("#main-container").fadeOut(4000);
        $("#win-battle").removeClass("hide");
        pokeBattle.pause();
    }
    }
    else{
        currentState.play();
    }
};
var init = function(){
    cpuPokemon = pikachu;
    userPokemon = charmander;
    $(".user-pokemon-name").text(userPokemon.name);
    $(".enemy-pokemon-name").text(cpuPokemon.name);
    $(".user-pokemon-lvl").text("Lv" + userPokemon.lvl);
    $(".enemy-pokemon-lvl").text("Lv" + cpuPokemon.lvl);
    $("#lose-battle").text("Your " + userPokemon.name + " has fainted. You quickly run away to the Pokemon Center...");
    $("#win-battle").text("The enemy " + cpuPokemon.name + " fainted. You win the battle!");    
    currentState = playerTurn;
    loop();
};
init();
