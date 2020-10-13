var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors=require('cors')
app.use(bodyParser.json())

app.use(cors())
// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

require('./app/routes/products.routes.js')(app);
require('./app/routes/companies.routes.js')(app);


app.get('/', (req,res) => {
  res.json('Welcome to Companies Database Application.')
})


// Create a Server
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})