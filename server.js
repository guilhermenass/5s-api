require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jwt = require('express-jwt')

const routes = require('./src/routes/routes');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/views'))
app.use(jwt({ secret: process.env.SECRET_KEY}).unless({path: ['/users', '/authenticate', '/authenticateApp', '/verifyEmail', '/validateFirstAccess','/firstAccess','/newPassword/:token'] }))

// routes
app.use([
	routes.usersRoutes,
	routes.unitsRoutes,
	routes.auditRoutes,
	routes.enviromentTypesRoutes,
	routes.enviromentsRoutes,
	routes.questionsRoutes,
	routes.evaluationRoutes,
	routes.emailRoutes
])

app.listen(process.env.PORT || 4000, function(){
	console.log('server is up')
})  
