
window.onload = function()
{
    // get WIDTH and HEIGHT
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    
    // create canvas
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    
    // set canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    
    ctx = canvas.getContext("2d");
    
    player = new Character(40, 40);
    player.draw();

    window.addEventListener("keydown", function(evt)
                              {
                                console.log("Down: " + evt.which );
                                KEYBOARD_KEYS[evt.which] = true;
                              })
    window.addEventListener("keyup", function(evt)
                          {
                            KEYBOARD_KEYS[evt.which] = false;
                          })
    
    
    // begin to render the game
    BeginRender();
}

function animate()
{
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // redraw player
    player.update();
    
}

// render function which will keep 30fps
function BeginRender()
{
    var frameRate = 1000/30;
    setInterval(animate, frameRate);
}