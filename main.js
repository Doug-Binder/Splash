
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
        	DisplayOlaf(e)
        }
        if (state == 2){
        	DisplayFull(e)
        }
        if (state == 3){
        	DisplayNYC(e);
        }
    }

left = 37

right = 39

}
function DisplayPortrait(){
	wrapper.style.webkitTransform = "translate3d(240px, 0px, 0px)";
    state=0;
}

function DisplayOlaf(ev){
	wrapper.style.webkitTransform = "translate3d(0px, 0px, 0px)";
	ev.stopPropagation();
    state=1;
}
function DisplayFull(ev){
	wrapper.style.webkitTransform = "translate3d(-240px,0px, 0px)";
	ev.stopPropagation();
    state=2;
}
function DisplayNYC(ev){
	wrapper.style.webkitTransform = "translate3d(-480px, 0px, 0px)";
	ev.stopPropagation();
    state=3;
}



function init(){
wrapper = document.getElementById("scroll-wrapper");
document.getElementById('olaf-flag').addEventListener('click', DisplayOlaf, false);
document.getElementById('full-flag').addEventListener('click', DisplayFull, false);
document.getElementById('nyc-flag').addEventListener('click', DisplayNYC, false);
document.getElementsByTagName('body')[0].addEventListener('click',DisplayPortrait, false)
document.onkeydown = ChangeState;
}