let dateText = document.querySelector('.date-setter');
let dateInput = document.querySelector('.setting-date'); 
const textMonth= { 
    0 : 'января', 1: 'февраля', 2: 'марта' , 3 : 'апреля' , 4 : "мая" , 5 : "июня" , 6 : "июля" , 7 : "августа" , 8 : "сентября" , 9 : "октября", 10 : "ноября" , 11 : "декабря"
}
dateText.addEventListener('click', ()=>{
    let date = new Date(); 
    dateInput.value = `${date.getDate()} ${textMonth[date.getMonth()]} ${date.getFullYear()}, ${date.getHours()}:${formatTime(date.getMinutes())}`; 
});

function formatTime(time){ 
    if ( time == 0) {
        return '00'
    }
    if ( time < 10){ 
        return `0${time}`
    }
    return time
}