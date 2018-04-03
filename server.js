/*const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/


const express = require('express');

const path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Run the app by serving the static files
// in the dist directory
//app.use(express.static(__dirname + '/src/app'));

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var services = require("./server/app.js")(app);

app.use('/api', services);

app.get('*', function (req, res) {
  res.sendFile(distDir + '/index.html');
});


// Start the app by listening on the default
// Heroku port
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port " + port);

