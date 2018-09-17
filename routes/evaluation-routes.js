var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/EvaluationController')

router.post('/evaluations', function(req, res) {
    new evaluationController(req, res).save(req.body);
});

router.get('/evaluations/:responsibleId', function(req, res){
    console.log('responsibleId', req.params.responsibleId)
    new evaluationController(req, res).loadByAppraiserId(req.params.responsibleId)
});

module.exports = router;