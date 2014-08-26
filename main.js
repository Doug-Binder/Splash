
var wrapper;
function DisplayPortrait(){
	wrapper.style.webkitTransform = "translate3d(240px, 0px, 0px)";
}

function DisplayOlaf(ev){
	wrapper.style.webkitTransform = "translate3d(0px, 0px, 0px)";
	ev.stopPropagation();
}
function DisplayFull(ev){
	wrapper.style.webkitTransform = "translate3d(-240px,0px, 0px)";
	ev.stopPropagation();
}
function DisplayNYC(ev){
	wrapper.style.webkitTransform = "translate3d(-480px, 0px, 0px)";
	ev.stopPropagation();
}


function init(){
	wrapper = document.getElementById("scroll-wrapper");
document.getElementById('olaf-flag').addEventListener('click', DisplayOlaf, false);
document.getElementById('full-flag').addEventListener('click', DisplayFull, false);
document.getElementById('nyc-flag').addEventListener('click', DisplayNYC, false);
document.getElementsByTagName('body')[0].addEventListener('click',DisplayPortrait, false)
}