var express = require('express')
var router = express.Router()
var questionController = require('../controllers/QuestionController')

router.post('/associate', function(req, res){
	new questionController(req, res).saveInAssociateTable(req.body)
})

router.put('/associate', function(req, res){
	new questionController(req, res).updateAssociateTable(req.body)
})

router.post('/questions', function(req, res) {
	new questionController(req, res).save(req.body)
})

router.get('/associate/:id', function(req, res){
	new questionController(req, res).getRelatedItems(req.params)
})

router.get('/questions/enviromentType/:enviromentTypeId', function(req, res){
	new questionController(req, res).getQuestionsByEnviromentTypeId(req.params.enviromentTypeId)
})

router.get('/questions/nonCompliances/:evaluationId', function(req, res){
	new questionController(req, res).getNonCompliancesByEvaluationId(req.params.evaluationId)
})

router.put('/questions/:id', function(req, res){
	new questionController(req, res).update(req.body)
})

router.get('/questions', function(req, res){
	new questionController(req, res).load()
})      

router.delete('/questions/:id', function(req, res){
	new questionController(req, res).remove()
})

module.exports = router