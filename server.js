require('dotenv').config();
var express = require('express')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var path = require('path')
var app = express()
const mysql = require('mysql')
const main = require('./routes/main')
var jwt = require('express-jwt')

const usersRoutes = require('./routes/user-routes')
const unitsRoutes = require('./routes/unit-routes')
const enviromentTypesRoutes = require('./routes/enviroment-types-routes')
const enviromentsRoutes = require('./routes/enviroment-routes')
const questionsRoutes = require('./routes/question-routes')
const evaluationsRoutes = require('./routes/evaluation-routes')

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/views'));
app.use(jwt({ secret: process.env.SECRET_KEY}).unless({path: ['/authenticate', '/verifyEmail/?email', '/validateFirstAccess','/firstAccess','/newPassword/:token'] }));

// routes
app.use([usersRoutes, unitsRoutes, evaluationsRoutes, enviromentTypesRoutes, enviromentsRoutes, questionsRoutes]);

app.listen(process.env.PORT || 4000, function(){
    console.log("server is up");
})  
