const express = require('express');
const  hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;



var app = express();


app.use(express.json());


hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine', 'hbs');



app.use((req, res, next) => {                               //middleware example: request logger
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err){
            console.log('Unable to append to server log.')
        }
    })
    next();
});


hbs.registerHelper('screamIt', (text) => {      //function with an argument  hbs syntax:   {{screamIt text}}
    return text.toUpperCase();
})

app.get('/editor', (req, res) => {
    res.render('editor.hbs', {
        welcome: 'Welcome James!'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to the AR-Craft Instructor Portal!',
        pageTitle: 'Home Page'
    });
});

app.get('/json', (req, res) => {
    res.send(textToAudio);
  });

  app.get('/metrics', (req, res) => {
    res.send(metrics);
  });

app.use(express.static(__dirname + '/public'));



app.listen(port, ()=>{
    console.log(`Server is up on  port ${port}`)
});
