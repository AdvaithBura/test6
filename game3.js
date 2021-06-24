function game3(){
    background(255);
    getBowLevel();
    getPlayerLevel();
    getPlayerHP();
    getHealthMoney();

  //  console.log(gameState);
  var bowText = bowLevel*25+20
  var playerText = playerLevel*25+20
  var jumpText = jumpLevel*25+20
  healthText = hpMoney *40+30;

  textSize(40);
  fill("red");
  text("Cost:" + jumpText, 65,530);
  text("Cost:" + bowText,65,80);   
  text("Cost: "+ playerText, 65,230);   
  text("Cost: "+ healthText,65,380);   
  text("Money:"+ Money, TW-250,50);
  text(""+playerLevel + "/10", 270,250)
  text(""+jumpLevel+"/5",270,550)
  text(""+bowLevel+"/10",270,100)
  text(""+ playerHP+"/no limit",270,400);
 

arrowButton.show();
lifeButton.show();
playerButton.show();
shopButton.show();
jumpButton.show();
player.visible = false
ground.visible = false
button2.hide();
//player.y = 100;
if(monster1 !== undefined){
monster1.destroy();
}
if(monster3 !== undefined){
monster3.destroy();
}

arrowButton.mousePressed(()=>{
    if(Money >= bowText && bowLevel <= 9){
    writeBowLevel(1);
    writeMoney(-bowText);
    }
})

lifeButton.mousePressed(()=>{
    if(Money >= healthText){
    writePlayerHP(1);
    writeMoney(-healthText);
    writeHealthMoney(1);
    }
})

playerButton.mousePressed(()=>{
    if(Money >= playerText && playerLevel <=9){
    writePlayerLevel(1);
    writeMoney(-playerText);
    }
})

shopButton.mousePressed(()=>{
    gameState = 2;
})

jumpButton.mousePressed(()=>{
    if(Money >= jumpText && jumpLevel <=4){
 writeJumpLevel(1);
 writeMoney(-jumpText);
    }
})
}