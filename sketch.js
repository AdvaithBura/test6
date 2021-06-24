var player, monster1, bow, arrow, playerImg, arrowImg, bowImg, monsterImg, x, ground, button1, text1, arrow2Img, monster3, bowLevel, database, button2, playerButon, arrowButton
var playerLevel, playerHP, lifeButton, resetButton, softResetButton, text2, text3, text4, shopButton, jumpButton, jumpLevel, leftWall, rightWall, topWall, Money, unMonster, hpMoney
var ball, ball1, ball2, ball3, sphereImg, bText1, bText2, bText3, speed,highScore, bText5, TW,TH
var gameState = 1;
var arrowState = 1;
var thePosition = 1;
var healthText = 30;
var money = 0;
var score = 0;
function preload(){
   playerImg = loadImage("boy.png");
   arrowImg = loadImage("theArrow.png");
   arrow2Img = loadImage("theArrow2.png");
   bowImg = loadImage("bow.png");
   monsterImg = loadImage("monster.png");
   sphereImg = loadImage("sphere.png")
}
function setup(){
    createCanvas(windowWidth-15,windowHeight-15);
    TW= windowWidth-10
    TH = windowHeight-10
    theWidth = displayWidth-100;
    theHeight = displayHeight-150
    database = firebase.database();
    imageMode(CENTER);
    player = createSprite(TW/2,TH-100,100,150);
    player.addImage(playerImg);
    player.scale = windowWidth/10000
    //player.debug = true;
    player.setCollider("rectangle", 0,-200,1300,1500);
   // player.visible = false;
    ground = createSprite(TW/2,TH-15,TW,20);
    leftWall = createSprite(-10,TH/2,20,TH);
    rightWall = createSprite(TW+10,TH/2,20,TH);
    topWall = createSprite(TW/2,-10,TW,20);

    text1 = createElement("h1","MONSTER HUNTER GAME!");   
    text1.style("color", 'red'); 
    /*
    bText1 = createElement("h4","To play, press space key to shoot arrows. Left and right arrow keys will let you move left and right. Up arrow will let you jump.");
    bText1.position(10,180);
    bText2 = createElement("h4","The goal of the game is to get as high of a score as you can. Killing monsters gives you money and points. Money allows you to buy") 
    bText2.position(10,210);
    bText3 = createElement("h4","upgrades in the shop to help you. Shoot monsters with arrows to kill. If they touch you, then you take damage. The balls in the game")
    bText3.position(10,240);
    bText4 = createElement("h4","will damage you if they touch you but you cannot destroy them. Once you lose, if you have enough money, you have a chance to start")
    bText4.position(10,270);
    bText5 = createElement("h4","again with the current progress otherwise you can restart the entire game")
    bText5.position(80,300);
    */
    button1 = createButton("Click to play");
    text1.position(TW/2.8,TH/4);
    button1.position(TW/2.2,TH/4+100);
    button2 = createButton("Click to go to shop");
    button2.position(50,200);
    arrowButton = createButton("Click to make arrows travel faster");
    arrowButton.position(50,100);
    playerButton = createButton("Click to make player move faster");
    playerButton.position(50,250);
    lifeButton = createButton("Click to increate player's health");
    lifeButton.position(50,400);
    resetButton = createButton("Click to restart the game(all upgrades will be lost)");
    resetButton.position(150,300);
    softResetButton = createButton("Clck to restart the game(all upgrades will be kept)");
    softResetButton. position(750,300);
    shopButton = createButton("Click to exit shop");
    shopButton.position(100,TH-50);
    jumpButton = createButton("Click to make player jump higher");
    jumpButton.position(50,550)
   // ball();

}


function draw(){
    if(gameState === 1){
        background("white");
        getHiScore();
        textSize(20);
        fill("red");
  // bText1.show()
   //bText2.show()
   //bText3.show()
   //bText4.show()
   button1.show()
   //bText5.show()
   text1.show()

       textSize(40);
      // text("GOOD LUCK!!!", 470,370);
       text("High Score:"+highScore,TW/2.5,TH-200);
        shopButton.hide();
        //writePlayerHP(1);
        getPlayerHP();
        player.visible = false;
        ground.visible = false;
        button2.hide();
        arrowButton.hide();
        playerButton.hide();
        lifeButton.hide();
        resetButton.hide();
        softResetButton.hide();
        jumpButton.hide();
        button1.mousePressed(()=>{  
            gameState = 2;
            button1.hide();
            text1.hide();
        })        
    }


    if(gameState ===2){
     //   writePlayerHP(1);
        game2()
        if(playerHP === 0){
            gameState = 4;
        }
    }

if(gameState === 3){
 game3();
}

if(gameState === 4){
    background("white");
    console.log("You lose!");
    player.velocityY = 0;
    player.visible = false
    button2.hide();
    if(unMonster*200 > highScore){
        writeHiScore(unMonster*200);
    }
    //player.velocityY = 0
    //monster1.destroy();
    //monster3.destroy();
  //  bow.destroy();
  //player.x = 2000;
  //tint(bowImg, 0);
  textSize(20);
  fill("blue");
  resetButton.show();
  healthText = hpMoney*40+30
  var hpText1 = healthText+100
  text("Cost: all remaining money", 220,250);
  textSize(40);
  text("Money:"+ Money, 800,50);

 
  text("YOU LOSE", 500,100);
 //var moreH = healthText + 10

  resetButton.mousePressed(()=>{
      writePlayerHP(1);
      writePlayerLevel(-playerLevel);
      writeBowLevel(-bowLevel);
      writeJumpLevel(-jumpLevel);
      writeMoney(-Money);
      writedeadMonster(-unMonster);
      writeHealthMoney(-hpMoney);
      gameState = 1;
  })
console.log(hpText1);
  
  if(Money>= hpText1){
    softResetButton.show();  
    textSize(20);
    text("Cost:"+ hpText1,870,250);  
   //   console.log("hi")
  }

  softResetButton.mousePressed(()=>{
    writeMoney(-hpText1);
    writePlayerHP(1);
    writeHealthMoney(1);
    gameState = 1;
})

  
}
drawSprites();
}

function jump(){
   /* for(var x = 200; x>=-200; x = x--){
    player.x = player.x - x
    }
    */
   player.velocityY = -7 - jumpLevel;
}

function monster(){   
    //var rand = Math.round(random(1,3))
    var monster = createSprite(TW, TH-100,50,50);
    monster1 = monster;
    monster1.addImage(monsterImg);
    monster1.scale = windowWidth/4500;
    monster1.velocityX = -7-speed;
}

function nextMonster(){
    var monster2 = createSprite(0, TH-100, 50,50);
    monster3 = monster2;
    monster3.addImage(monsterImg);
    monster3.scale = windowWidth/4500;
    monster3.velocityX = 7+speed;   
}

function ball(){   
  //  var rand = Math.round(random(1,3))
    var ball = createSprite(TW, TH-100, 50,50);
    ball3 = ball;
    ball3.addImage(sphereImg);
    ball3.scale = 0.2;
    ball3.setCollider("circle",10,-2,160);
  // ball3.debug = true
    //monster1 = monster;
    //monster1.addImage(monsterImg);
    //monster1.scale = 0.3;
    ball.velocityX = -9-speed;
}

function nextBall(){   
   // var rand = Math.round(random(1,3))
    var ball1 = createSprite(0, TH-100, 50,50);
    ball2 = ball1;
    ball2.addImage(sphereImg);
    ball2.scale = 0.2;
    ball2.setCollider("circle",10,-2,160);
 //   monster1 = monster;
 //   monster1.addImage(monsterImg);
 //   monster1.scale = 0.3;
    ball1.velocityX = 9+speed;
}