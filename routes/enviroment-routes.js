var express = require('express');
var router = express.Router();
var enviromentController = require('../controllers/EnviromentController');
var jwt = require('express-jwt');

router.post('/enviroments', function(req, res) {
    new enviromentController(req, res).save(req.body);
});

router.put('/enviroments/:id', function(req, res){
    new enviromentController(req, res).update(req.body);
})

router.get('/enviroments', function(req, res){
    new enviromentController(req, res).load();
})

router.delete('/enviroments/:id', function(req, res){
    new enviromentController(req, res).remove();
})

router.get('/enviroments/:unitId', function(req, res) {
    new enviromentController(req, res).loadEnviromentsByUnit();
})

module.exports = router;