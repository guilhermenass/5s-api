var express = require('express')
var router = express.Router()
var authController = require('../controllers/AuthController')
var userController = require('../controllers/UserController')

router.post('/authenticate', function(req, res) {
	new authController(req, res).authenticate()
})

router.post('/validateFirstAccess', function(req, res) {
	new userController(req, res).validateFirstAccess()
})

router.post('/users', function(req, res) {
	new userController(req, res).save(req.body)
})

router.put('/users/:id', function(req, res){
	new userController(req, res).update(req.body)
})

router.put('/updatePassword/:id', function(req, res){
	new userController(req, res).updatePassword(req.body)
})

router.get('/users', function(req, res){
	new userController(req, res).load()
})  

router.get('/users/:unitId', function(req, res) {
	new userController(req, res).loadResponsiblesByUnit(req.params.unitId);
})

router.delete('/users/:id', function(req, res){
	new userController(req, res).remove()
})

router.post('/resetPassword', function(req, res) {
	new userController(req, res).resetPassword()
})

router.get('/verifyEmail', function(req, res){
	new userController(req, res).verifyEmail()
})

router.get('/newPassword/:token', function(req, res){
	new userController(req, res).createNewPassword()
})

module.exports = router