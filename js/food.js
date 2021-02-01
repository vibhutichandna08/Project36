class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.milkImg = loadImage("../Images/Milk.png");
    }

    //read food stock from database
    getFoodStock() {
        return this.foodStock;
    }

    //update the Food Stock to database
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    //reduce number of milk bottles
    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1
        }
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }
    display() {
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.milkImg, 720, 220, 70, 70);

        if (this.foodStock !== 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.milkImg, x, y, 50, 50);
                x = x + 30;
            }
        }
    }


}