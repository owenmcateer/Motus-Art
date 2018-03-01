/**
 * Motus Art
 * This is a compress JavaScript file to view the
 * source of this animation visit https://owenmcateer.github.io/Motus-Art/
 * https://github.com/owenmcateer/Motus-Art/tree/master/src/week_02
 */
'use strict';var sketch=function(a){var b,c,d,e,f=0,h=0,i=0,j=0,k=1,l=0,m=0,n,o,q,r=[];a.setup=function(){a.createCanvas(900,380),a.colorMode(a.RGB,255,255,255,1),a.pixelDensity(1),b=a.random(198,202),c=a.random(260,244),d=a.random(19,21),e=a.random(39,41),f=a.PI/2,h=a.PI/4,n=a.width/2,o=-0.27*a.height,r=[a.color(229,252,255,0.3),a.color(122,79,242,0.7),a.color(230,9,116,0.7),a.color(20,34,51)],q=a.createGraphics(a.width,a.height),q.background(r[3]),q.translate(n,o)},a.draw=function(){a.background(r[3]),a.imageMode(a.CORNER),a.image(q,0,0,a.width,a.height);var s=-k*(2*d+e)*a.sin(f),t=-e*k*a.sin(f-2*h),u=-2*a.sin(f-h)*e,v=j*j*c+i*i*b*a.cos(f-h),w=b*(2*d+e-e*a.cos(2*f-2*h)),x=(s+t+u*v)/w;s=2*a.sin(f-h),t=i*i*b*(d+e),u=k*(d+e)*a.cos(f),v=j*j*c*e*a.cos(f-h),w=c*(2*d+e-e*a.cos(2*f-2*h));var y=s*(t+u+v)/w;i+=x,j+=y,f+=i,h+=j;var z=b*a.sin(f),A=b*a.cos(f),B=z+c*a.sin(h),C=A+c*a.cos(h);if(1<a.frameCount){var D=a.map(B,-1*(b+c),b+c,0,1),E=a.lerpColor(r[1],r[2],D);q.stroke(E),q.strokeWeight(2),q.line(l,m,B,C)}l=B,m=C}},header=new p5(sketch,'canvas');
console.log('Looking for code?');
console.log('https://github.com/owenmcateer/Motus-Art');