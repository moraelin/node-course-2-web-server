const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// Parameter setzen (hier die View Engine)
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// MIDDLEWARe
app.use((req, res, next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next(); // sonst gehts nicht weiter
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
      pageTitle: "maintenance"
    });
});

// MIDDLEWARE: Bereitstellen statischer Strukturen
app.use(express.static(__dirname + '/public'));

// statt das currentYear in jedem view zu übergeben.
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// ERSTE MÖGLICHKEIT: Bereitstellen über Objekte oder Strings
// definiert einen HTTP GET request
app.get('/', (req, res) => {

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Website',
  });
});

app.get('/about', (req, res) => {
  // rendert mit der aktuellen view engine die templates
  // das zweite Argument: ein Objekt, das die key-value-pairs ins templates
  // überträgt
  res.render('about.hbs', {
    pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    // SEND: die Daten, die auf einen Request hin gesendet werden sollen
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// der Port, auf den die App hört
// zweites Argument: Arrow function mit der Nachricht, sobald der Server startet.
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
