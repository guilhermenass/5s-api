var express = require('express')
var router = express.Router()
var evaluationController = require('../controllers/EvaluationController')

router.post('/evaluations', function(req, res) {
	new evaluationController(req, res).save(req.body)
})

router.get('/evaluations/appraiser', function(req, res){
	new evaluationController(req, res).loadByAppraiserId(req.user.id)
})

router.get('/evaluations/responsible', function(req, res){
	new evaluationController(req, res).loadByResponsibleId(req.user.id)
})

router.post('/evaluations/finish', function(req, res){
	new evaluationController(req, res).finishEvaluation(req.body)
})

router.post('/evaluations/emailSuccessful', (req, res) => {
	new evaluationController(req, res).sendEmailSuccessful()
})

router.put('/evaluations/:id', function(req, res) {
	new evaluationController(req, res).updateEvaluation(req.body.status, req.body.responsibleId)
})

router.post('/evaluations/emailWithNonCompliances', (req, res) => {
	new evaluationController(req, res).sendEmailWithNonCompliances(req.body.nonCompliances)
})
