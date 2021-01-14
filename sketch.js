var database;
var dog,sadDog,happyDog;
var feedPetBtn, addFoodBtn;
var foodObj;
var food, foodS;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.addImage(happyDog);
  dog.scale=0.15;

  database = firebase.database();

  feedDogBtn = createButton("Feed Brownie!");
  feedDogBtn.position(400, 350);
  feedDogBtn.mousePressed(feedDog);

  addFoodBtn = createButton("Add Food!");
  addFoodBtn.position(400, 450);
  addFoodBtn.mousePressed(addFoodS);


  foodObj = new Food();
  food = database.ref("Food");
  food.on("value", readStock);

}

function draw() {
  background(46,139,87);
  drawSprites();

  if (foodS === 0) {
    dog.changeAnimation("dog1", happyDog);
  }
  
  fedTime = database.ref("LastFed");
  fedTime.on("value", (data) => {
    lastFed = data.val();
  })
  textAlign(CENTER, CENTER)
  //lines to display the time for last fed
  fill(255, 255, 254);
  textSize(15);

  if (lastFed >= 12) {
    text("Last Fed Time: " + lastFed % 12 + " PM", 250, 50);
  } else if (lastFed === 0) {
    text("Last Fed Time: 12 AM", 250, 50);
  } else {
    text("Last Fed Time: " + lastFed + " AM", 250, 50);

  }

  foodObj.display();

  //add styles here
  textSize(15);
  fill("white");
  text("Feed Hank!", 250, 30);
  text("Food Stock Level: " + foodS, 250, 70);

}


function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  if (foodS < 0) {
    foodS = 0
  }
}

function feedDog() {
  dog.changeAnimation("dog2", happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    LastFed: hour()
  })
}

function addFoodS() {
  foodS++
  database.ref("/").update({
    Food: foodS
  })
}




