function AlienShip(x,y,rowNumber){
	this.x=x;
	this.y=y;
	this.n=rowNumber;
	this.img=loadImage('img/space-invaders'+this.n+'.png');
	this.xspeed=1;
	this.show = function(){
		imageMode(CENTER);
		image(this.img, this.x, this.y, 60, 50);
		// fill(0,0,255);
		// rectMode(CENTER);
		// rect(this.x,this.y,60,50);
	}
	this.move = function(){
		this.x+=this.xspeed;
	}

	this.shiftDown =function(){
		if(this.y+20 < height-100){
			this.xspeed*= -1;
			this.y+=20;
		}else{
			gameOver();
		}
	}
}

function MasterShip(x,y){
	this.x=x;
	this.y=y;
	this.xspeed=3;
	this.hold=floor(random(0,width/abs(this.xspeed)))*3;
	this.beam=0;
	this.img=loadImage('img/ufo.png');
	this.show = function(){
		imageMode(CENTER);
		image(this.img, this.x, this.y, 70, 50);
		// fill(255,0,0);
		// noStroke();
		// rectMode(CENTER);
		// rect(this.x,this.y,60,50);
	}
	this.move = function(){
		if(this.x == this.hold && this.beam<=250){
			// console.log("beamming!");
			this.beamming(this.beam);			
			this.beam++;
		}else{
			this.beam=0;
			this.x+=this.xspeed;
		}

	}

	this.beamming = function(beam){
			fill(random(255),random(255),random(255));
			rect(this.x-2,this.y+25,5,beam*5);
	}

	this.reset = function(x,y){
		this.x=x;
		this.y=y;
		this.xspeed=3;
		this.beam=0;
		this.hold=floor(random(0,width/abs(this.xspeed)))*3;
	}

	this.hits =function(drop){
		if(dist(this.x,this.y,drop.x,drop.y) < 32)
		{
			return true;
		}
		else{
			return false;
		}
	}
}