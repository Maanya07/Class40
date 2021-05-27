class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    car1=createSprite(100,200);
    car1.addImage(carImg1);
    car2=createSprite(300,200);
    car2.addImage(carImg2);
     car3=createSprite(500,200);
     car3.addImage(carImg3);
    car4=createSprite(700,200);
    car4.addImage(carImg4);
    cars=[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getRank();
    if(allPlayers !== undefined){
     // var display_position = 130;
     background('black');
     image(trackImg,0,-displayHeight*4, displayWidth, displayHeight*5);
     var x= 200;
     var y; 
     var index=0;
     for(var plr in allPlayers){
     index= index+1;
     
     //Position the cars away from each other on x axis
     x= x+200;
     //Use data from database to display the car's y position
     y=displayHeight-allPlayers[plr].distance;

     cars[index-1].x=x;
     cars[index-1].y=y;

     if(index===player.index){
      fill ('black');
      ellipse(x,y,60,60);
     cars[index-1].shapeColor='Blue';
    camera.position.x=displayWidth/2;
    camera.position.y=cars[index-1].y;
     }
    
       // textSize(15);
       // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
  

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
      drive.play();
    }



    console.log(player.distance);

    if(player.distance >= 4300){
    gameState=2;
    player.rank= player.rank+1;
    player.updateRank(player.rank);
    textSize(20);
    fill("blue");
    text("Your rank is" + player.rank, displayWidth/2, y-100);
    }

    if(gameState===2){
      drive.stop();
    }
    
    drawSprites();
  }
}
