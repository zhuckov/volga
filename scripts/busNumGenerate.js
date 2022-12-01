let busGenerateBtn = document.querySelector('.bus-number-generate'); 
let busInput = document.querySelector('.setting-reg-num');
const letters = [ "А", "В", "Е", "К", "М", "Н", "О", "Р", "С", "Т", "У", "Х"]; 
const nmb = ['0', '1' , '2' , '3', '4' , '5' , '6' , '7', '8' , '9']
busGenerateBtn.addEventListener('click', ()=>{
    busInput.value =`${letters[Math.floor(Math.random()*letters.length)]} ${nmb[Math.floor(Math.random()*nmb.length)]}${nmb[Math.floor(Math.random()*nmb.length)]}${nmb[Math.floor(Math.random()*nmb.length)]} ${letters[Math.floor(Math.random()*letters.length)]}${letters[Math.floor(Math.random()*letters.length)]}` ; 
})