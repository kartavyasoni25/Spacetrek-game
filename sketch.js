var ship;
var master;
var masterShip;
var life;
var score;
var shipImg;
var masterCounter;
var drops=[];
var aliens=[];
var alienDrops=[];
var highScore=[];

function setup(){
	createCanvas(1500,700);
	frameRate(30);
	life=3;
	master = false;
	score=0;	
	var existing = localStorage.getItem('highScore');
	if(existing)
	{
		highScore=existing;
	}else{
		highScore = 0;
	}
	ship = new Ship();
	shipImg = loadImage('img/spaceship.png');
	masterShip =new MasterShip(-30,90);
	masterCounter=0;
		for(var i = 0 ;i < 4 ;i++)
		{
			for (var j = 0; j < 13; j++) {
			aliens.push(new AlienShip(100*j+50,60*i+150,i));
			}

		}
	
}


function draw(){
	background(20);
	textSize(24);
	fill(0,200,200);
	noStroke();	
	text('<SCORE> '+score+' ', 100, 30);
	if(highScore>=score){
	text('<HIGH_SCORE> '+highScore+' ', 400, 30);	
	}else{
		highScore=score;
		text('<HIGH_SCORE> '+highScore+' ', 400, 30);
	}
	
	text('<LIFE> '+life+' ',800,30);
	for(var i=0;i<life;i++)
	{
		imageMode(CENTER);
		image(shipImg, 50*i+1000, 20, 40, 30);
	}
	stroke(255,255,0);
	line(0,56,width,56);
	if (keyIsDown(LEFT_ARROW)) {
    	ship.move(-1);
  } 
   	if (keyIsDown(RIGHT_ARROW)) {
    	ship.move(1);
  }
  if(aliens.length === 0)
  {
  	levelUp();
  }

  if(random(0,1)< 0.002)
		{
			master=true;
		}
  	if(random(0,1)< 0.03)
		{
			var index = aliens.length-1-floor(random(0,13));
			if(aliens[index])
			{
				alienDrops.push(new drop(aliens[index].x,aliens[index].y,1));
			}
		}
  for(var i = 0; i<drops.length; i++)
  {
  	drops[i].show();
  	drops[i].move();

  	if(drops[i].y< 56)
  	{
  		drops.splice(i,1);
  	}

  	for(var j=0;j<aliens.length;j++)
  	{
  		if(aliens[j] && drops[i] && drops[i].hits(aliens[j])){
  			score+=40-aliens[j].n*10;
  			drops.splice(i,1);
  			aliens.splice(j,1);
  		}
  	}
  }

  for(var i = 0; i<alienDrops.length; i++)
  {
  	alienDrops[i].show();
  	alienDrops[i].move();
  	if(alienDrops[i].y > height+15)
  	{
  		alienDrops.splice(i,1);
  	}
  }

	ship.show();

	if(master)
	{
		masterShip.show();
		masterShip.move();
		for(var i=0;i<drops.length;i++)
		{

			if(masterShip.hits(drops[i]))
  			{
  				score+=200;
  				if(life<=7)
  				{
  					masterCounter++;
  				}
  				if(masterCounter===3)
  				{
  					life++;
  					masterCounter=0;
  				}
  				drops.splice(i,1);
  				master=false;
  				masterShip.reset(-30,90);

  			}
		}
		if(masterShip.x > width+30 || masterShip.x < -30)
		{
			masterShip.hold=floor(random(0,width/abs(masterShip.xspeed)))*3;
			masterShip.beam=0;
			masterShip.xspeed*= -1;
			master= false;
		}
	}

	var moveDown = false;
	for (var i = 0; i < aliens.length; i++) {
		aliens[i].show();
		aliens[i].move();
		if(aliens[i].x > width-30 || aliens[i].x < 30)
		{
			moveDown = true;
		}
	}
	
	for(var i=0;i<alienDrops.length;i++){
		if(ship.hits(alienDrops[i])){
			life--;
			if(life<=0)
			{
				gameOver();
			}
			ship.reset();
			alienDrops.splice(i,1);
		}
	}
	// point(masterShip.x+1,masterShip.y+570);
	if(masterShip.beam*5>510 && dist(ship.x,height-40,masterShip.x+1,masterShip.y+570)<30){
		life--;
		if(life<=0)
		{
			gameOver();
		}		
		ship.reset();
	}

	if(moveDown)
	{
		for (var i = 0; i < aliens.length; i++) {
			aliens[i].shiftDown();
		}
	}
}

function keyPressed()
{	
  if(key === ' ' && drops.length < 2)
	{
		
		drops.push(new drop(ship.x,height-50,-1));
	}
}

function levelUp(){
	masterCounter=0;
  	for(var i=0; i<4;i++)
		{
			for (var j = 0; j < 13; j++) {
			aliens.push(new AlienShip(100*j+50,60*i+150,i));
			}
		}
}

function gameOver(){
			// clear();
			// background(20);
			noLoop();
			localStorage.setItem('highScore',highScore);
			window.location.href = "gameOver.html";
}
