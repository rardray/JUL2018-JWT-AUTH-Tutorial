const express = require('express'),
    app = express(),
    logger = require('morgan'),
    config = require('./config/main'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
const router = require('./router')
const server = app.listen(config.port)
console.log('Server running on ' + config.port)

mongoose.connect(config.database)

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.get('/', function(req, res) {  
    res.send('Relax. We will put the home page here later.');
  });
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials")
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

router(app)