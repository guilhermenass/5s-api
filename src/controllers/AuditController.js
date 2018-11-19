var models = require('../models')
var auditDAO = require('../dao/AuditDAO')
var genericDAO = require('../dao/GenericDAO')

module.exports = class AuditController {
	constructor(req, res) {
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	load() {
		new auditDAO().load(models.Audit)
		.then(audits => {
			return this.res.json(audits)
		})
		.catch((error) => {
			return this.res.status(500).json({
				errorDetails: error
			})
		})
	}

	loadAuditsByUnit(unitId){
		new auditDAO().loadAuditsByUnit(unitId)
		.then(res => {
			return this.res.status(200).json(res)
		})
		.catch((error) => {
			return this.res.status(500).json({
				errorDetails: error
			})
		})
	}

	loadAuditsToReport() {
		this.dao.load(models.Audit)
		.then(audits => {
			return this.res.json(audits)
		})
		.catch((error) => {
			return this.res.status(500).json({
				errorDetails: error
			})
		})
	}

	save(audit){
		this.dao.save(models.Audit, audit)
			.then((res) => {
				return this.res.status(201).json({
					type: 'success',
					message: 'Auditoria salva com sucesso!',
					auditId: res.id
				})
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'error',
					message: 'Ocorreu um erro ao tentar salvar!',
					errorDetails: error
				})
			})
	}

	update(audit){
		this.dao.update(models.Audit, audit)
			.then(() => {
				return this.res.status(200).json({
					type: 'success',
					message: 'Auditoria salva com sucesso!'
				})
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'error',
					message: 'Ocorreu um erro ao tentar salvar!',
					errorDetails: error
				})
			})
	}

	remove() {
		this.dao.remove(models.Audit, this.req.params.id)
			.then((deletedRecord) => {
				if(deletedRecord)
					return this.res.status(200).json({
						type: 'success',
						message: 'Exclusão realizada com sucesso!'
					}) 
				else
					return this.res.status(404).json({
						type: 'error',
						message: 'Registro não encontrado!'
					})        
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'error',
					message: 'Ocorreu um erro ao tentar remover',
					errorDetails: error
				}) 
			})
	}
}