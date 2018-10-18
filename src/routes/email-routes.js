var express = require('express')
var router = express.Router()
var emailController = require('../controllers/EmailController')

router.post('/success', function(req, res){
	new emailController(req, res).sendEmailSuccessfulEvaluation(this.req.body.email)
})

module.exports = router
