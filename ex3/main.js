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
    	/* Compositing */
    	//Regular - Default - Draw an element on top of other
    	context.fillStyle="#f00";
    	context.fillRect(0,0,100,100);
    	context.fillStyle="#00f";
    	context.fillRect(50,50,100,100);
    	//Global Alpha - Set the alpha value globally
    	context.globalAlpha = 0.5;
    	//Anything drawn will now inherit the alpha value
    	context.fillStyle="#0f0";
    	context.fillRect(100,100,100,100);
    	//Reset Global Alpha
    	context.globalAlpha=1;
    	//We can also set alpha value using the rgba fillstyle format
    	context.fillStyle="rgba(127,127,0,0.5)";
    	context.fillRect(150,150,100,100);
    	//rgba values are set in reference to global alpha
    	context.globalAlpha=0.5;
    	context.fillStyle="rgba(255,0,255,0.5)"; //Sets the alpha to 0.25 since global alpha is 0.5
    	context.fillRect(200,200,100,100);
    	//Reset global alpha
    	context.globalAlpha=1;


    	/* Global Composite Operation Property */
    	//There are several values this can take
    	// source-over  : default, draw the source over the destination
    	// destination-over : draw the destination over the source. what we draww goes to bottom
    	// source-atop : only draw parts of source top of destination whenver they overlap.
    	// destination-atop : only draw parts of destination on top of source whenver they overlap
    	// source-in : only draw parts of the source which DOES overlap any part of destination
    	// destination-in : only draw parts of destination which DOES overlap any of source
    	// source-out : only draw partss of source which DOESN'T overlap with destination
    	// destination-out : only draw parts of destination which DOESN'T overlap any of source
    	// lighter : the part that overlaps is the sum of colours if both source and destination
    	// copy : only draw the source, remove destination
    	// xor : the part that overlaps is made transparent

    	//Example
    	context.fillStyle="#0ff";
    	context.globalCompositeOperation="source-atop";
    	context.fillRect(250,250,100,100);
    	//Reset composite property
    	context.globalCompositeOperation="source-over";

    	/* Shadows */
    	// Properties : shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor
    	context.save();
    	context.shadowColor="#000";
    	context.shadowBlur= 5;
    	context.shadowOffsetX=5;
    	context.shadowOffsetY=5;

    	context.fillRect(300,300,100,100);
    	context.restore();
    	/* Gradients */


    	var gradient = context.createLinearGradient(0, 0, 400, 350); 
    	//createRadialGradiant for radial . createRadialGradiant(x0,y0,r0,x1,y1,r1)
		gradient.addColorStop(0, "rgb(0, 0, 0)");
		gradient.addColorStop(1, "rgb(255, 255, 255)");
		context.fillStyle = gradient;
		context.fillRect(350, 250, 100,100);



		/*IGNORING BEZIER CURVES FOR NOW */

		/*Saving as image - Uncomment lines below to get the image*/
		//var dataURL = canvas.get(0).toDataURL();
		//var img = $("<img></img>");
		//img.attr("src", dataURL);
		//canvas.replaceWith(img);


    }
	
});