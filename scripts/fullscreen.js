let fullscreenElement = $("#fullscreen-btn"); 
let html = document.documentElement;
$(fullscreenElement).on('click', fullscreen); 
function fullscreen(){
    if (!document.fullscreenElement){
        html.requestFullscreen();
    }
    else{
        document.exitFullscreen();
    }
}

