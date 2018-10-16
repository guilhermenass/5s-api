var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/EvaluationController')

router.post('/evaluations', function(req, res) {
    new evaluationController(req, res).save(req.body);
});

router.get('/evaluations', function(req, res){
    new evaluationController(req, res).loadByAppraiserId(req.user.id);
});

router.post('/evaluations/finish', function(req, res){
    new evaluationController(req, res).finishEvaluation(req.body);
})

router.post('/evaluations/emailSuccessful', (req, res) => {
    new evaluationController(req, res).sendEmailSuccessful();
})

router.put('/evaluations/:id', function(req, res) {
    new evaluationController(req, res).updateStatus(req.body.status)
})

router.post('/evaluations/emailWithNonCompliances', (req, res) => {
    new evaluationController(req, res).sendEmailWithNonCompliances(req.body.nonCompliances);
})

module.exports = router;