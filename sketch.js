var dogSprite,dogImage,happyDogImage,foodStockRef,database,lastFed

function preload(){
  dogImage = loadImage("images/dogImg.png")
  happyDogImage = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000,500);
  dogSprite = createSprite(800,250)
  dogSprite.addImage(dogImage)
  dogSprite.scale = 0.3
  database = firebase.database()
  foodObj = new Food()
  foodStockRef = database.ref('food');
  foodStockRef.on("value",function(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS)
  })
  feedDog = createButton("Feed dog");
  feedDog.position(700,95);
  feedDog.mousePressed(function(){
    dogSprite.addImage(happyDogImage)
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      food: foodObj.getFoodStock(),
      fedTime: hour()
    })
    //dogSprite.addImage(dogImage)
    //console.log("here")
  })
  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(function(){
    foodS = foodS+1;
    database.ref('/').update({
      food: foodS
    })
  })
}


function draw() { 
  background(46,139,87)
  drawSprites();
  textSize(18)
  fill(255,255,255)
  fedTime = database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  })
  text("Note: Press UP_ARROW to feed Drago milk",20,20)
  text("Food remaning: "+foodObj.foodStock,20,40)
  text("last fed:"+lastFed,20,60)
  foodObj.display();

}




