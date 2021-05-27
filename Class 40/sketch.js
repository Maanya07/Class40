var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1, car2,  car3, car4;
var cars;
var carImg1, carImg2, carImg3, carImg4, trackImg;
var drive;

var form, player, game;

function preload(){
carImg1= loadImage('car1.png');
carImg2= loadImage('car2.png');
carImg3= loadImage('car3.png');
carImg4= loadImage('car4.png');
trackImg= loadImage( 'track.jpg');
drive= loadSound('carsound.mp3');
}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
}
