let fullscreenElement = document.querySelector("#fullscreen-btn"); 
fullscreenElement.addEventListener('click', fullscreen); 
function fullscreen(){
    let html = document.documentElement;
    if (!document.fullscreenElement){
        html.requestFullscreen();
    }
    else{
        document.exitFullscreen();
    }
}

