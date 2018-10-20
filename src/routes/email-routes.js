var express = require('express')
var router = express.Router()
var emailController = require('../controllers/EmailController')

router.post('/email/success', function(req, res){
	new emailController(req, res).sendEmailSuccessfulEvaluation(req.body.email)
})

router.post('/email/nonCompliances', function(req, res){
	console.log('reqqqq', req.body)
	new emailController(req, res).sendEmailWithNonCompliances(req.body)
})

module.exports = router
