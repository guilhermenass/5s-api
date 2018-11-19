var express = require('express')
var router = express.Router();
var reportController = require('../controllers/ReportController')

router.get('/report/:auditId', function(req, res) {
    new reportController(req, res).filter(req.params.auditId)
})

module.exports = router;    