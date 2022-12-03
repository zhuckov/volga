const express = require('express');
const path = require('path'); 

const app = express(); 
app.set("view engine", "ejs");
app.use(express.static(__dirname))
app.get('/', (req , res) =>{
    res.render('pages/fakebus')
})
app.get('/setting', (req,res) =>{ 
    res.render('pages/ticket-setting')
})
app.listen(3000, '0.0.0.0')