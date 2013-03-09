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



        /*Creating image*/

        var imageData = context.createImageData(200,200);
        var pixels = imageData.data;

        var pixelCount = imageData.width*imageData.height;

        for(var i=0;i<pixelCount;i++){
            //Cyan colour. (0,255,255)
            pixels[i*4] = 0;
            pixels[i*4+1] = 255;
            pixels[i*4+2] = 255;
            pixels [i*4+3] = 255;
        };
        //Draw the image we just created
        context.putImageData(imageData,0,0);



        /*Drawing a small mosaic*/
        imageData = context.createImageData(200,200);
        pixels = imageData.data
        //Declare the number of rows and columns
        var numRows=4;
        var numColumns=4;

        //Get the width and height of each tile
        var tileWidth = imageData.width/numColumns;
        var tileHeight = imageData.height/numRows;


        //Nested loop to loop through each row, column and all the pixels in a tile
        for(var row=0;row<numRows;row++){

            for(var col=0;col<numColumns;col++){

                var red = Math.floor(Math.random()*255);
                var green = Math.floor(Math.random()*255);
                var blue = Math.floor(Math.random()*255);
                //var alpha = Math.floor(Math.random()*255);
                //Looping through rows and columns in a tile
                for(var tileRow=0;tileRow<tileHeight;tileRow++){
                    for(var tileCol=0;tileCol<tileWidth;tileCol++){
                        //Get the exact positin on screen (X,Y)
                        var pixelX = (col*tileWidth)+tileCol;
                        var pixelY = (row*tileHeight)+tileRow;
                        //Calculate the position of this pixel in the CanvasPixelArray
                        var pos = (pixelY*(imageData.width*4))+(pixelX*4);

                        //Assign colour to this pixel
                        pixels[pos] = red;
                        pixels[pos+1] = green;
                        pixels[pos+2] = blue;
                        pixels[pos+3] = 255;

                    };
                };

            };

        };
        //Draw the mosaic
        context.putImageData(imageData,200,0);


        /* Run this on a web server to work  */

        /*Manipulating images - Advanced*/        

        //Load an image using jQuery
        var image = new Image();
        image.src="test.jpg";

        //Only draw image after it loads
        $(image).load(function(){
            //Draw scaled full image. drawImage(image,x,y)
            context.drawImage(image,400,00,200,200);

            //Inverting colours
        
            //Get the image data and pixels
            imageData = context.getImageData(400,0,200,200);
            pixels = imageData.data;
            pixelCount = pixels.length;

            //Loop to invert colours
            for(var i=0;i<pixelCount;i++){
                pixels[i*4] = 255 - pixels[i*4];
                pixels[i*4+1] = 255 - pixels[i*4+1];
                pixels[i*4+2] = 255 - pixels[i*4+2];
                //For greyscale, calculate average grey value as  - 
                //(pixels[i*4]+pixels[i*4+1]+pixels[i*4+2])/3;
                //and assign this value all three values. ie, (r,g,b)
            };

            //Draw the colour inverted image to its side
            context.putImageData(imageData,600,0);


            //Pixelisation
            imageData=0;
            pixels=0;
            //Get the image data of original image
            imageData = context.getImageData(400,0,200,200);
            pixels = imageData.data;
            //Set number of tiles when pixelised
            var numTileRows = 50;
            var numTileCols = 50;
            //Calculate tile width and height
            var tileWidth = imageData.width/numTileCols;
            var tileHeight = imageData.height/numTileRows;
            //Loop through each tile
            for (var row = 0; row < numTileRows; row++) {
                for (var col = 0; col < numTileCols; col++) {
                    //Find the center pixel in each tile
                    var x = (col*tileWidth)+(tileWidth/2);
                    var y = (row*tileHeight)+(tileHeight/2);
                    //Get the position of pixel in the CanvasPixelArray
                    var pos = (Math.floor(y)*(imageData.width*4))+(Math.floor(x)*4);
                    //Get the (r,g,b) values of the pixel
                    var red = pixels[pos];
                    var green = pixels[pos+1];
                    var blue = pixels[pos+2];
                    //Set the colour of that tile to the colour of the centre pixel
                    context.fillStyle = "rgb("+red+", "+green+", "+blue+")";
                    //Draw the tile (rectangle)
                    context.fillRect((x-(tileWidth/2)),200+(y-(tileHeight/2)),tileWidth,tileHeight);
                    //Draw the tile as a circle
                    context.beginPath();
                    context.arc(200+x,200+y,tileWidth/2,0,Math.PI*2,false);
                    context.closePath();
                    context.fill();
                };
            };



        });
       


    }
	
});