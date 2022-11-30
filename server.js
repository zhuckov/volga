const express = require('express');
const path = require('path'); 

const port = 8080; 
const app = express(); 

app.use(express.static(__dirname))
app.get('/', (req , res) =>{
    res.sendFile(path.join(__dirname , "pages",  'fakebus.html'))
})

app.listen(3000, '0.0.0.0')