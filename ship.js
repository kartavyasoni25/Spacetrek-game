function Ship(){

	this.x=width/2;
	this.img=loadImage('img/spaceship.png');

	this.show = function(){
		imageMode(CENTER);
		image(this.img, this.x, height-40, 50, 70);
		// rectMode(CENTER);
		// fill(255);
		// noStroke();
		// rect(this.x,height-30,50,50);
	}

	this.move = function(dir)
	{
		if(this.x+dir*7 < width-25 && this.x+dir*7 > 25)
		{
			this.x+=dir*7;
		}
		
	}
	this.reset =function(){
		this.x=width/2;
	}
	this.hits = function(drop)
	{
		if(dist(this.x,height-30,drop.x,drop.y) < 32)
		{
			return true;
		}else{
			return false;
		}

	}
}