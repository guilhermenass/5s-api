var express = require('express')
var router = express.Router()
var unitController = require('../controllers/UnitController')

router.post('/units', function(req, res) {
	new unitController(req, res).save(req.body)
})

router.put('/units/:id', function(req, res){
	new unitController(req, res).update(req.body)
})

router.get('/units', function(req, res){
	new unitController(req, res).load()
})  

router.get('/units/:questionId', function(req, res){
	new unitController(req, res).getUnitByEnviromentType()
})

router.delete('/units/:id', function(req, res){
	new unitController(req, res).remove()
})


module.exports = router