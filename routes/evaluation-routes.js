var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/EvaluationController')

router.post('/evaluations', function(req, res) {
    new evaluationController(req, res).save(req.body);
});

router.get('/evaluations', function(req, res){
    console.log('reqqqqqqqqq', req)
    console.log('req.paramssssss', req.params)
    new evaluationController(req, res).loadByAppraiserId(req.params.responsibleId)
});

module.exports = router;