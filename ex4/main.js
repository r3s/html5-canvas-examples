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
    	/* Loading and Playing with Images */

        //Load an image using jQuery
        var image = new Image();
        image.src="test.jpg";

        //Only draw image after it loads
        $(image).load(function(){
            //Draw full image. drawImage(image,x,y)
            context.drawImage(image,0,0);
            //Scaling image drawImage(image,x,y,width,height)
            context.drawImage(image,0,0,20,20);
            //Cropping image
            context.drawImage(image,40,40,100,100,500,100,100,100);

        });

        //The files should be run on a server for the below code to work.
        //Running without a server will raise security errors
        //Most of the below code is taken from the book "Foundation HTML5 Canvas" by Rob Hawkes
        canvas.click(function(e) {
            //Example of getting image data. 

            //Get the position of mouse click
            var canvasOffset = canvas.offset();
            var canvasX = Math.floor(e.pageX-canvasOffset.left);
            var canvasY = Math.floor(e.pageY-canvasOffset.top);
            //Get the image data where the click was made
            var imageData = context.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;
            //Use the vaalues we just obtained
            var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+","+pixel[3]+")";
            //Change the background colour of body
            $("body").css("backgroundColor", pixelColor);
        });


    }
	
});