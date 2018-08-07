var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/EvaluationController')

router.post('/evaluations', function(req, res) {
    new evaluationController(req, res).save(req.body);
})

router.get('/evaluations', function(req, res) {
    new evaluationController(req, res).load();
})

router.put('/evaluations/:id', function(req, res){
    new evaluationController(req, res).update(req.body);
})

router.delete('/evaluations/:id', function(req, res){
    new evaluationController(req, res).remove();
})

module.exports = router;