var express = require('express')
var router = express.Router()
var emailController = require('../controllers/EmailController')

router.post('/email/success', function(req, res){
	new emailController(req, res).sendEmailSuccessfulEvaluation(req.body.email)
})

router.post('/email/nonCompliances', function(req, res){
	new emailController(req, res).sendEmailWithNonCompliances(req.body)
})

router.post('/email/schedule', function(req, res){
	new emailController(req, res).sendEmailSchedulingEvaluation(req.body)
})

router.post('/email/newPassword', function(req, res){
	new emailController(req, res).sendEmailNewPassword(req.body)
})

router.post('/email/revaluation', function(req, res){
	new emailController(req, res).sendRevaluationEmail(req.body.email)
})

module.exports = router
