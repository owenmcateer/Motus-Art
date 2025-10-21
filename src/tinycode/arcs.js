// #tinycode #p5t @CCodeMadrid
f=255;s=23;draw=_=>{createCanvas(192,192);background(0);noFill();stroke(f);strokeWeight(3)
for(i=81;i--;){o=(i%2?0:PI)+f+cos(i/40);arc(i%9*s,floor(i/9)*s,s,s,o,PI+o)}f+=.015;}