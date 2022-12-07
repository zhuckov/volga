let settingBlock = document.getElementById('settings'); 
let pageBlock = document.getElementById('page-block'); 
settingBlock.addEventListener('click' , ()=>{
    move()
})
async function move(){
    const response = await fetch('/setting' , {
        method : 'GET'
    }).then( 
        (text) =>{ 
            text.text().then( function (da){
                console.log(da) 
                pageBlock.innerHTML = da ; 
            }
            )
        }
    )
}