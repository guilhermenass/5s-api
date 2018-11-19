var express = require('express')
var router = express.Router()
var auditController = require('../controllers/AuditController')

router.post('/audits', function(req, res) {
	new auditController(req, res).save(req.body)
})

router.get('/audits', function(req, res) {
	new auditController(req, res).load()
})

router.get('/audits/report', function(req, res) {
	new auditController(req, res).loadAuditsToReport()
})

router.get('/audits/:unitId', function(req, res) {
	new auditController(req, res).loadAuditsByUnit(req.params.unitId);
})

router.put('/audits/:id', function(req, res){
	new auditController(req, res).update(req.body)
})

router.delete('/audits/:id', function(req, res){
	new auditController(req, res).remove()
})

module.exports = router