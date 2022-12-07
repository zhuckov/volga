let parent = document.querySelector('.wrapper'); 
let child =  document.querySelector('.ticket-block'); 
let footer = document.querySelector('.footer-menu'); 
let flag; 

child.addEventListener('touchstart', ()=>{ 
  flag = 0; 
  child.addEventListener('touchmove', (e)=>{
    flag = 1; 
    animateticket(e);
  }
);
}); 




child.addEventListener('touchend', (e)=>{
  let y = child.style.transform.slice(15, -3); 
  if (y == ''){
    y = `${Math.round(e.view.innerHeight -  50 )}`
  }

  child.setAttribute('data-posY',`${y}px`);
  child.setAttribute('data-end-posY',`${Math.round(e.view.innerHeight -  50 )}px`);

  if (flag == 0){ 

    if (child.style.transform.slice(15,-3) == `${Math.round(e.view.innerHeight -  50 )}` || child.style.transform.slice(15,-3) == ''){
      setTimeout (()=>{
        child.classList.remove('on-click-animate-start');
        child.style.transform = `translate(0 , 50px)`;
      },276);
      child.classList.add('on-click-animate-start');
    }else if (child.style.transform.slice(15,-3) == 0 ){

      setTimeout (()=>{
        child.classList.remove('on-click-animate-end');
        child.style.transform = `translate(0 , ${Math.round(e.view.innerHeight -  50 )}px)`
      },276);
      child.classList.add('on-click-animate-end');

  
    }
  }

  else if(flag == 1){
    
    if (Math.round(e.changedTouches[0].pageY) <= Math.round (e.view.innerHeight / 2)){
       const style = document.createElement('style'); 
       style.textContent = `@keyframes ticketAnimate{
        from { 
            transform: translate(0 , ${y}px); 
    
        }
        to{
            transform: translate(0 , 50px); 
        }
      }
      .start-animate-ticket{ 
        animation: ticketAnimate 200ms linear forwards;  
      }`
      document.body.append(style); 

      setTimeout(()=>{
        child.classList.remove('start-animate-ticket')
        child.style.transform = `translate(0 , 50px)` 
      }, 400)
      child.classList.add('start-animate-ticket') 
    } 
    else{ 
      const style = document.createElement('style'); 
       style.textContent = `@keyframes ticketAnimateEnd{
        from { 
            transform: translate(0 , ${y}px); 
    
        }
        to{
            transform: translate(0 , ${Math.round(e.view.innerHeight -  50 )}px); 
        }
      }
      .end-animate-ticket{  
        animation: ticketAnimateEnd 400ms linear forwards; 
    }`
      document.body.append(style); 

      setTimeout(()=>{
        child.classList.remove('end-animate-ticket')
        child.style.transform = `translate(0 , ${Math.round(e.view.innerHeight -  50 )}px)` 
      }, 400)
      child.classList.add('end-animate-ticket') 
    } 
    setTimeout(()=>{
      let styles = document.body.querySelectorAll('style'); 
      for (let kal of styles){
        kal.remove()
      }
    
    }, 400)
  }
})
  
function animateticket(e){

    if (Math.round( (e.changedTouches[0].pageY) >= 50) && (e.view.innerHeight - Math.round( e.changedTouches[0].pageY)  >= 50) ){ 
      child.style.transform = `translate(0 , ${Math.round( e.changedTouches[0].pageY)}px)`  
    }
}
