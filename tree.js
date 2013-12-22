function drawBranches(count, x, y, angle, chunk_height, chunk_width, ctx)
{
    if(count == 0) return;
    else
    {
        ctx.moveTo(x, y);
        var to_x = x + chunk_height*Math.cos(angle);
        var to_y = y - chunk_height*Math.sin(angle);
        ctx.lineWidth = chunk_width;
        ctx.lineTo(to_x, to_y);
        ctx.stroke();
        drawBranches(count-1, to_x, to_y, angle+(angle/2)*Math.random(), chunk_height*0.7, chunk_width*0.8, ctx);
        drawBranches(count-1, to_x, to_y, angle-(angle/2)*Math.random(), chunk_height*0.7, chunk_width*0.8, ctx);
    }
}
function drawTree(canvas, ctx, x, y, height)
{
    var chunk_height = height*0.7;
    var chunk_width = (Math.random()+1)*height/10;
    var angle = Math.PI/2;
    angle = angle+(Math.random()-0.5)*0.2
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = chunk_width;
    var to_x = x + chunk_height*Math.cos(angle);
    var to_y = y - chunk_height*Math.sin(angle);
    ctx.lineTo(to_x, to_y);
    ctx.stroke();

    // randomly generate more branches
    var count = 0;
    while(Math.random() > Math.random())
    {
        drawBranches(parseInt((Math.random()+2)*2), to_x, to_y, angle+angle/2*Math.random(), chunk_height*0.6, chunk_width*0.8, ctx);
        count++;
        if(count == 2) break; // generate at most 2 
    }
    
    drawBranches(6 /*+ parseInt((Math.random()-0.5)*3)*/, to_x, to_y, angle+(angle/2)*Math.random(), chunk_height*0.7, chunk_width*0.8, ctx);
    drawBranches(6 /*+ parseInt((Math.random()-0.5)*3)*/, to_x, to_y, angle-(angle/2)*Math.random(), chunk_height*0.7, chunk_width*0.8, ctx);
    
}