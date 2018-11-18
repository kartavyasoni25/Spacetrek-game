function drop(x,y,d){
	this.x=x;
	this.y=y;
	this.d=d;

	this.show = function(){
		fill(0,255,0);
		noStroke();
		ellipse(this.x,this.y,15,15);
	}

	this.move = function(){
		this.y+=this.d*20;
	}

	this.hits = function(alien){
		if(dist(this.x,this.y,alien.x,alien.y) < 32)
		{
			return true;
		}
		else{
			return false;
		}
	}
}