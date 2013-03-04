$(document).ready(function(){

	//Get canvas context
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");


	 // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.attr("width",window.innerWidth);
            canvas.attr("height",window.innerHeight);
            drawStuff();
    }
    resizeCanvas();

    function drawStuff(){
    	
    	//Draw a Rectangle
		context.fillStyle = "#F0F"; 
		context.fillRect(0,0,100,100); 	
		//save current settings
		context.save();
		/*-----------------------------------------*/
		//Translation - Move origin to center
		context.translate(window.innerWidth/2,window.innerHeight/2);
		//Draw same rectangle in the new position
		context.fillRect(0,0,100,100);

		//Restore previous settings
		context.restore();
		//Draw something next to the first square
		context.arc(150,50,50,0,Math.PI*2,false);
		context.fill();
		/*-----------------------------------------*/
		//Save settings again
		context.save();
		/*-----------------------------------------*/
		//Scaling- increase the x an y scale. Setting to 2 now
		context.scale(2,2);
		//Draw scaled rectangle in the top left corner. 
		//Will be double it's size even though it's the same dimensions as before
		context.fillRect(0,0,100,100);
		/*-----------------------------------------*/
		//Restore settings
		context.restore();
		context.save();
		/*-----------------------------------------*/
		//Rotate - Draw a rotated element near the top right corner
		//Rotation is based on the the centre of the canvas.
		//So we have to move the centre to the centre of the object we r going to draw
		context.translate(window.innerWidth-100,100);
		context.rotate(0.7854); // Rotate 45 degrees (in radians)
		context.fillStyle="#000";
		context.fillRect(0,0,100,100);
		/*-----------------------------------------*/

		context.restore();

		/*-----------------------------------------*/
		//Transformation matrix - Combination of transforms in to a matrix
		//context.transform(xScale, ySkew, xSkew, yScale, xTrans, yTrans);
		//Scale by 2, move origin to the right below the previous block, skew it with value 1
		context.transform(2,1,1,2,window.innerWidth-200,window.innerHeight/2);
		context.fillRect(0,0,50,50);
    }
	
});