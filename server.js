const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname + "/views/partials");

//template engine
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + "/public"));

//helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//middleware
app.use((req, res, next) => {
    var log = new Date().toString() + " " + req.method + " " + req.url;
    fs.appendFile('server.log', log + "\n", (err) => {
        if (err) {
            console.log('Unable to log');
        }
    });
    console.log(log);
    next();
});

app.get('/', (req, res, next) => {

    res.render('home', {
        msg: "Welcome to the express",
        pageTitle: "Home",


    });

});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Bad request"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: "About",

    });
});

app.listen(3000, () => {
    console.log('server is running at port 3000')
});