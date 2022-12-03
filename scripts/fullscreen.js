let fullscreenElement = document.querySelector("#fullscreen-btn"); 
let html = document.documentElement;
fullscreenElement.addEventListener('click', fullscreen); 
function fullscreen(){
    if (!document.fullscreenElement){
        html.requestFullscreen();
    }
    else{
        document.exitFullscreen();
    }
}

