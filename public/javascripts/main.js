
var wrapper;
var state = 0;
function ChangeState(e){
	   e = e || window.event;
    if (true) {
        if (e.keyCode == '37'){
        	if (state != 0) state--;
        }
        else if(e.keyCode == '39'){
        	state++;
        	state = state%4;
        }
        else if (e.keyCode == "32"){
        	state++;
        	state = state%4;
        };

        if (state == 0){
        	DisplayPortrait(e)
        }
        if (state == 1){
        	DisplayFirst(e)
        }
        if (state == 2){
        	DisplaySecond(e)
        }
        if (state == 3){
        	DisplayThird(e);
        }
    }
left = 37

right = 39

}
function DisplayPortrait(){
	wrapper.style.webkitTransform = "translate3d(240px, 0px, 0px)";
    state=0;
}

function DisplayFirst(ev){
	wrapper.style.webkitTransform = "translate3d(-240px, 0px, 0px)";
	ev.stopPropagation();
    state=1;
}
function DisplaySecond(ev){
	wrapper.style.webkitTransform = "translate3d(-480px,0px, 0px)";
	ev.stopPropagation();
    state=2;
}
function DisplayThird(ev){
	wrapper.style.webkitTransform = "translate3d(-720px, 0px, 0px)";
	ev.stopPropagation();
    state=3;
}
function hoverMediaItem(ev){
    this.getElementsByClassName("media-about-sub")[0].style.borderBottom = "1px solid #FF6C26";
}
function mouseoutMediaItem(ev){
        this.getElementsByClassName("media-about-sub")[0].style.borderBottom = "0px solid #FF6C26";
}
function mousedownMediaItem(ev){
         this.getElementsByClassName("media-about-sub")[0].style.borderBottom = "1px solid #CC561E";
}
function mouseupMediaItem(ev){
         this.getElementsByClassName("media-about-sub")[0].style.borderBottom = "1px solid #FF6C26";
}

function init(){
      if(window.innerWidth >= 800 && window.innerHeight >= 600) {//sloppy remove functionality for mobile hack
wrapper = document.getElementById("scroll-wrapper");
document.getElementById('do-olaf').addEventListener('click', DisplayFirst, false);
document.getElementById('do-full-stack').addEventListener('click', DisplaySecond, false);
document.getElementById('do-job').addEventListener('click', DisplayThird, false);
document.getElementsByTagName('body')[0].addEventListener('click',DisplayPortrait, false);
document.onkeydown = ChangeState;
var x = document.getElementsByClassName('media-about');
    for (i=0;  i < x.length; i++){
        x[i].addEventListener("mouseover", hoverMediaItem, false);
        x[i].addEventListener('mouseout', mouseoutMediaItem, false);
        x[i].addEventListener('mousedown', mousedownMediaItem, false);
        x[i].addEventListener('mouseup', mouseupMediaItem, false);
        }
    }
}
