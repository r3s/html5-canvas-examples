var image = new Image();
image.src="test.jpg";

$(window).load(function(){
    //Get canvas context
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");

    
    //Set canvas fullscreen
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    $(canvas).attr("width",WIDTH).attr("height",HEIGHT);
    
    //particles[] array hold every particle generated
    var particles = [];
    //holds mouse coordinates
    var mouse = {};
    //enable or disable particles originating from mouse by setting this value. disabled=-1
    var enabled=1;
    //numberof particles
    var particle_count = 20;
    //fill the particles[] array with two types of particles
    for(var i = 0; i < particle_count; i++)
    {
        //push particle type 1 (originating from mouse). class definition comes later
        particles.push(new particle1());
    }
    particle_count=30;
    for(var i = 0; i<particle_count;i++){
        //push particle type 2 (floating particles)
        particles.push(new particle2());
    }
    

    //add listener for mouse move and mouse down events on canvas
    canvas.on('mousemove', track_mouse);
    canvas.on('mousedown', switch_enabled);
    
    //function to get mouse coordinates
    function track_mouse(e)
    {
        //since the canvas = full page the position of the mouse 
        //relative to the document will suffice
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
    //function to switch between enabled and disabled state for particle type 1
    function switch_enabled(e)
    {
        enabled*=-1;
    }
    

    // ======================PARTICLE1======================

    //The coloured particles that originate from mouse
    function particle1()
    {
        var random = Math.random();
        //set the speed of the particle.. some random speed
        this.speed = {
            x: (random>0.5)?Math.random()*10:Math.random()*-10,
            y: (random>0.5)?Math.random()*10:Math.random()*-10
        };
        
        //location = mouse coordinates
        if(mouse.x && mouse.y)
        {
            this.location = {x: mouse.x, y: mouse.y};
        }
        //if mouse coordinates are not available, use centre of the screen
        else
        {
            this.location = {x: WIDTH/2, y: HEIGHT/2};
        }
        
        //radius range = 5 to 35
        this.radius = 5+Math.random()*30;
        
        //life time of the particle(5000-5100)
        this.life = 5000+Math.random()*100;
        //remaining life = total life , initially. This value will be decremented later
        this.remaining_life = this.life;
        //set the colours and opacity
        this.r = Math.round(Math.random()*255);
        this.g = Math.round(Math.random()*255);
        this.b = Math.round(Math.random()*255);
        this.opacity = Math.round(this.remaining_life/this.life*100)/100;
        //the rgba representation of the colours and opacity
        this.rgba = "rgba("+this.r+","+this.g+","+this.b+","+this.opacity+")";

        //the draw function is used to draw the particle on the canvas
        this.draw = function(gradient){
            //set stroke style
            context.strokeStyle=this.rgba;
            //draw the circle
            context.arc(this.location.x, this.location.y, this.radius, Math.PI*2, false);
            context.stroke();
        };


    }


    // ======================PARTICLE2======================


    function particle2()
    {
        
        var random = Math.random();
        //set the speed of the particle.. some random speed
        this.speed = {
            x: (random>0.5)?Math.random()*2:Math.random()*-2,
            y: (random>0.5)?Math.random()*2:Math.random()*-2
        };

        //set some random starting location
        this.location={
            x : Math.random()*WIDTH,
            y : Math.random()*HEIGHT
        };

        //set random particle radius between 5 and 15
        this.radius = 5+Math.random()*10;
        //set total life time as 10000
        this.life = 10000;
        this.remaining_life = this.life;
        //set the opacity 
        this.opacity = Math.abs(0.8 -Math.random());
        this.blinkDirection=1;
          
        //function to draw the particle
        this.draw = function(){
            
            if(this.opacity<=0)
                this.blinkDirection=-1;
            else if(this.opacity>=0.8)
                this.blinkDirection=1;

            //create a radial gradient, containing only 2 colours rgb(80,80,80) and rgb(255,255,255)
            var gradient = context.createRadialGradient(this.location.x, this.location.y, 0, this.location.x, this.location.y, this.radius);
            gradient.addColorStop(0, "rgba("+255+", "+255+", "+255+", "+this.opacity+")");
            gradient.addColorStop(0.8, "rgba("+177+", "+177+", "+177+", "+0+")");
          

            context.fillStyle=gradient;
            context.arc(this.location.x, this.location.y, this.radius, Math.PI*2, false);
            context.fill();
        };


    }
    



    // Global draw function to draw everything on canvas

    function draw()
    {
        //Set the globalCompositeOperation property to source-over (explained in previous examples)
        context.globalCompositeOperation = "source-over";
        //set the canvas background to a shade of blue
        // context.fillStyle = "#003D73    ";
        // context.fillRect(0, 0, WIDTH, HEIGHT);
        context.drawImage(image,0,0,WIDTH,HEIGHT);
        //change the globalCompositeOperation property to lighter
        context.globalCompositeOperation = "lighter";
        //loop through each particle to draw them
        for(var i = 0; i < particles.length; i++)
        {
            var p = particles[i];
            context.beginPath();        
           

            //if our particle is an instance of the type 1, make sure to check enabled value
            if((p instanceof particle1)&&enabled==-1)
                continue;
            p.draw();
            //lets move the particles, reduce it's life and in case of particle type, reduce radius
            p.remaining_life--;
            if(p instanceof particle1)
                p.radius--;
            //change the location based on speed
            p.location.x += p.speed.x;
            p.location.y += p.speed.y;
            //if our particle is of type2, make sure it doesn't go out of the screen
           if(p instanceof particle2){
                if(p.location.x < 0 || p.location.x>WIDTH)
                    p.speed.x*=-1;
                if(p.location.y<0 || p.location.y>HEIGHT)
                    p.speed.y*=-1;
                
                //Reduce or increae opacity, for blink effect
                if(p.blinkDirection==1)
                    p.opacity-=0.005;
                else if(p.blinkDirection==-1)
                    p.opacity+=0.005;

            }
            
            
            //regenerate particles if their life's over or has become invisible
            if(p.remaining_life <= 0 || p.radius < 0)
            {
                //a brand new particle replacing the dead one
                if( p instanceof particle1)
                    particles[i] = new particle1();
                else if(p instanceof particle2)
                    particles[i] = new particle2();
            }
        }
    }
    
    //draw the scene every 33miliseconds, and thus animate!
    setInterval(draw, 33);
});