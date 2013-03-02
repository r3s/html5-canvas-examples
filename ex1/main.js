$(document).ready(function(){

	//Get canvas context
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");

	//Draw Stuff

	//Rectangle
	context.fillStyle = "#0ff";
	context.fillRect(80,80,100,100);


	//Lines
	context.strokeStyle = "#f00";
	//Let's draw it as a path
	context.beginPath();
	//line1
	context.moveTo(180,180);
	context.lineTo(250,250);
	//line2
	context.moveTo(250,250);
	context.lineTo(250,80);
	//line3
	context.moveTo(250,80);
	context.lineTo(180,80);
	//close the path
	context.closePath();
	//Stroke all lines
	context.stroke();


	//Circles
	context.strokeStyle =  "#00f";
	context.fillStyle = "#0f0";
	context.beginPath();
	//Draw circle as an arc
	context.arc(300,300,70,0,Math.PI*2,false);
	context.closePath();
	context.fill();
	context.stroke();


	//The above code will be useless since the canvas will be cleared
	//after the following function declarations. Comment below section
	//to see the above code in action.


	function drawArc(x,y,radius,startAngle,endAngle,antiClockWise){
		context.beginPath();
		context.arc(x,y,radius,startAngle,endAngle,antiClockWise);
		context.closePath();
		context.stroke();
	}

	function drawLine(startX,startY,endX,endY){
		context.beginPath();
		context.moveTo(startX,startY);
		context.lineTo(endX,endY);
		context.closePath();
		context.stroke();
	}

	//Let's do something fun.
	var width = canvas.width();
	var height = canvas.height();
	//clear the canvas
	context.clearRect(0,0,width,height);
	//set sstroke colour to black
	context.strokeStyle = "rgb(0,0,0)";
	//Draw a stick figure!
	//Eyes!
	drawArc((width/2-20),50,10,0,Math.PI*2,false);
	drawArc((width/2+20),50,10,0,Math.PI*2,false);
	//Nose!
	drawLine((width/2),55,(width/2-5),65);
	drawLine((width/2-5),65,(width/2),65);
	//Mouth!
	drawLine((width/2-20),70,(width/2+20),70);
	//Head!
	drawArc((width/2),50,50,0,Math.PI*2,false);
	//Body!
	drawLine((width/2),100,(width/2),180);
	//Upper Arms!
	drawLine((width/2),100,(width/2-30),120);
	drawLine((width/2-30),120,(width/2-30),160);
	//Lower Arms!
	drawLine((width/2),100,(width/2+30),120);
	drawLine((width/2+30),120,(width/2+30),160);
	//Legs!
	drawLine((width/2),180,(width/2-30),250);
	drawLine((width/2),180,(width/2+30),250);


	//Time to write something.
	context.fillStyle="#000";
	var text = "My first HTML5 Canvas Example!";
	context.fillText(text,10,height-10);


});
	