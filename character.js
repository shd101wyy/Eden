
// create character
function Character(x, y)
{
    this.x = x;
    this.y = y;
    this.size = 40;
    this.face = null;
    this.stroke_style = "#807272";
    this.line_width = 4;
    this.max_v = 10;
    // this.status = UNMOVE;
    this.facing_direction = MOVE_DOWN;
    this.v_x = 0; // x axis direction velocity
    this.v_y = 0; // y axis direction velocity
    
    this.items = [];
    
    // draw character
    this.draw = function()
    {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.stroke_style;
        ctx.lineWidth = this.line_width;
        ctx.stroke();
    }
    // draw items
    this.drawItems = function()
    {
        for(var i = 0; i < this.items.length; i++)
        {
            this.items[i].draw();
        }
    }
    // update and draw
    this.update = function()
    {
        var ismoving = false;
        if(KEYBOARD_KEYS[83] || KEYBOARD_KEYS[40]) // s
        {
            if(!(this.v_y > 10))
                this.v_y = this.v_y + 2;
            ismoving = true;
            this.facing_direction = MOVE_DOWN;
        }
        if(KEYBOARD_KEYS[87] || KEYBOARD_KEYS[38]) // w
        {
            if(!(this.v_y < -10))
                this.v_y = this.v_y - 2;
            ismoving = true;
            this.facing_direction = MOVE_UP;
        }
        if(KEYBOARD_KEYS[65] || KEYBOARD_KEYS[37]) // a
        {
            if(!(this.v_x < -10))
                this.v_x = this.v_x - 2;
            ismoving = true;
            this.facing_direction = MOVE_LEFT;
        }
        if(KEYBOARD_KEYS[68] || KEYBOARD_KEYS[39]) // d
        {
            if(!(this.v_x > 10))
                this.v_x = this.v_x + 2;
            ismoving = true;
            this.facing_direction = MOVE_RIGHT;
        }
        if(KEYBOARD_KEYS[90]) // z
        {
            var x;
            var y;
            if(this.facing_direction == MOVE_LEFT)
            {
                x = this.x - this.size - 0.1;
                y = this.y;
            }
            if(this.facing_direction == MOVE_RIGHT)
            {
                x = this.x + this.size + 0.1;
                y = this.y;
            }
            if(this.facing_direction == MOVE_DOWN)
            {
                x = this.x;
                y = this.y + this.size + 0.1;
            }
            if(this.facing_direction == MOVE_UP)
            {
                x = this.x;
                y = this.y - this.size - 0.1;
            }
            var has_collision = false;
            
            /* check collision 
                actually overlap */
            for(var i = 0; i < has_collision.length; i++)
            {
                if(WORLD_OBJECTS[i].x == x && WORLD_OBJECTS[j].x == y)
                {
                    has_collision = true;
                    break;
                }
            }
            if(!has_collision)
            {
                var item = new Wall(x, y);
                this.items.push(item);
                WORLD_OBJECTS.push(item);   
            }
        }
        if(ismoving === false)
        {
            if(this.v_x > 0)
                this.v_x = this.v_x - 1;
            if(this.v_x < 0)
                this.v_x = this.v_x + 1;
            if(this.v_y > 0)
                this.v_y = this.v_y - 1;
            if(this.v_y < 0)
                this.v_y = this.v_y + 1;
        }
      
         // update position
        this.y = this.y + this.v_y;
        this.x = this.x + this.v_x;       
        
        
        // var player_center_x = this.x + this.size/2;
        // var player_center_y = this.y + this.size/2;
        // check player collision
        for(var i = 0; i < WORLD_OBJECTS.length; i++)
        {
            var r = this.size; //  + WORLD_OBJECTS[i].size;   
            
            // var obj_center_x = WORLD_OBJECTS[i].x + WORLD_OBJECTS[i].size/2;
            // var obj_center_y = WORLD_OBJECTS[i].y + WORLD_OBJECTS[i].size/2;

            // console.log("R: " + r);
            // console.log(Math.abs(player_center_x - obj_center_x));
            // console.log(Math.abs(player_center_y - obj_center_y));
            
            if(Math.abs(WORLD_OBJECTS[i].x - this.x) < r && Math.abs(WORLD_OBJECTS[i].y - this.y) < r)
            {
                // restore position
                this.y = this.y - this.v_y;
                this.x = this.x - this.v_x;
                if(WORLD_OBJECTS[i].x > this.x)
                    this.x -= 1;
                if(WORLD_OBJECTS[i].x < this.x)
                    this.x += 1;
                if(WORLD_OBJECTS[i].y > this.y)
                    this.y -= 1;
                if(WORLD_OBJECTS[i].y < this.y)
                    this.y += 1;
                break;
            }
        }
        
        this.draw();        // draw character
        
        ctx.beginPath();
        this.drawItems();   // draw items
        ctx.stroke();
        ctx.fill();
    }
}


// create wall
function Wall(x, y)
{
    this.x = x;
    this.y = y;
    this.size = 40;
    this.stroke_style = "#d3a9a9";
    this.fill_style = "#c63f3f";
    this.line_width = 8;
    this.name = "wall";
    this.draw = function()
    {

        ctx.strokeStyle = this.stroke_style;
        ctx.fillStyle = this.fill_style;
        ctx.lineWidth = this.line_width;
        
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x, this.y);
    }
}