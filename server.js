const express = require('express');

const app = express(); 
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.get('/', (req , res) =>{
    res.render('pages/main.ejs' , {
        'page': 'fakebus', 
        'title': 'Главная'
    });
});
app.get('/setting', (req , res) =>{
    res.render('pages/main.ejs' , {
        'page': 'ticket-setting', 
        'title': 'Настройки'
    });
});
app.get('/profile', (req , res) =>{
    res.render('pages/main.ejs' , {
        'page': 'profile', 
        'title': 'Профиль'
    });
});

app.listen(3000, '0.0.0.0');