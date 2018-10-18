var express = require('express')
var router = express.Router()
var enviromentTypeController = require('../controllers/EnviromentTypeController')

router.post('/enviromenttypes', function(req, res) {
	new enviromentTypeController(req, res).save(req.body)
})

router.put('/enviromenttypes/:id', function(req, res){
	new enviromentTypeController(req, res).update(req.body)
})

router.get('/enviromenttypes', function(req, res){
	new enviromentTypeController(req, res).load()
})  

router.delete('/enviromenttypes/:id', function(req, res){
	new enviromentTypeController(req, res).remove()
})

router.delete('/associate/:id', function(req, res) {
	new enviromentTypeController(req, res).removeAssociatedItems(req.params.id)
})

router.get('/enviromenttypes/:unitId', function(req, res){
	new enviromentTypeController(req, res).loadEnviromentsTypeByUnit()
})

module.exports = router