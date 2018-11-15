require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jwt = require('express-jwt')
const routes = require('./src/routes/routes')
var isProduction = process.env.NODE_ENV == 'production';

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

app.use(jwt({ secret: process.env.SECRET_KEY}).unless({
	path: [
		'/authenticate',
		'/authenticateApp', 
		'/verifyEmail']
	}))

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


/* método que verifica as url's de acordo com o ambiente 
* TODO: Rever melhor forma para fazer isso
*/
if (isProduction) {
	process.env.API_URL = 'https://api-5s.herokuapp.com/';
	process.env.WEB_URL = 'https://web-5s.herokuapp.com/';
	process.env.LOGIN_URL = 'https://login-5s.herokuapp.com/';
}
else {
	process.env.API_URL = 'http://localhost:4000/';
	process.env.WEB_URL = 'http://localhost:4200/';
	process.env.LOGIN_URL = 'http://localhost:8080/';
}

