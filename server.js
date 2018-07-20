const express = require('express');
const  hbs = require('hbs');
const fs = require('fs')
const notes = require('./notes.js')
const generator = require('./app.js')
const port = process.env.PORT || 3000;


var textToAudio = JSON.parse(fs.readFileSync('textToAudio4.json', 'utf8'));

var app = express();



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


hbs.registerHelper('getCurrentYear', ()=>{  //function without an argument
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {      //function with an argument  hbs syntax:   {{screamIt text}}
    return text.toUpperCase();
})

hbs.registerHelper('getTextShort', (filename) => {      //function with an argument  hbs syntax:   {{screamIt text}}
    return notes.getNote(filename).textshort;
})


app.get('/editor', (req, res) => {
    res.render('editor.hbs', {
        pageTitle: 'Editor'
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

app.use(express.static(__dirname + '/generatedFiles'));

app.listen(port, ()=>{
    console.log(`Server is up on  port ${port}`)
});
