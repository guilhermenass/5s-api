var genericDAO = require('../dao/GenericDAO')
var models = require('../models')
var emailController = require('./EmailController')

module.exports = class EvaluationController {
	constructor(req, res) {
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	save(obj) {
		var evaluationDto = this.createDto(obj)
		this.dao.bulkCreate(models.Evaluation, evaluationDto)
			.then((res) => {
				return this.res.json(res)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	loadByAppraiserId(responsibleId) {
		this.dao.loadByAppraiserId(responsibleId)
			.then(evaluations => {
				return this.res.json(evaluations)
			})
			.catch((error) => {
				return this.res.status(400).json({
					errorDetails: error
				})
			})
	}

	createDto(audit) {
		let auditDto = []

		audit.evaluations.enviroments_id.forEach(enviromentId => {
			auditDto.push({
				enviroments_id: enviromentId,
				units_id: audit.evaluations.units_id,
				users_id: audit.evaluations.users_id,
				audits_id: audit.id,
				current_responsible: audit.evaluations.users_id,
				status: 0
			})
		})

		return auditDto
	}

	finishEvaluation(answer) {
		var dto = []
		answer.forEach(element => {
			dto.push({
				status: element.status ? 1 : 0, // 0 = negativo, 1 = positivo
				questions_id: element.questionId,
				evaluations_id: element.evaluateId
			})
		})
		this.dao.bulkCreate(models.Answer, dto)
			.then(() => {
				return this.res.status(201).json({
					type: 'success', message: 'Avaliação finalizada com sucesso!'
				})
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'error', message: 'Ocorreu um erro ao salvar!', errorDetails: error
				})
			})
	}

	async sendEmailSuccessful() {
		let isSent = false
		try {
			isSent = await new emailController().sendEmailSuccessfulEvaluation()
			if (isSent) {
				return this.res.status(200).json({
					type: 'success', message: 'E-mail enviado para o avaliador'
				})
			}
		} catch (error) {
			return this.res.status(500).json({
				type: 'error', message: 'Ocorreu um erro no envio do e-mail', errorDetails: error
			})
		}
	}

	async sendEmailWithNonCompliances(nonCompliances) {
		let isSent = false
		try {
			isSent = await new emailController().sendEmailWithNonCompliances(nonCompliances)
			if (isSent) {
				return this.res.status(200).json({
					type: 'success', message: 'E-mail enviado para o avaliador'
				})
			}
		} catch (error) {
			return this.res.status(500).json({
				type: 'error', message: 'Ocorreu um erro no envio do e-mail', errorDetails: error
			})
		}
	}

	async sendEmailSchedulingEvaluation() {
		let isSent = false
		try {
			isSent = await new emailController().sendEmailSchedulingEvaluation()
			if (isSent) {
				return this.res.status(200).json({
					type: 'success', message: 'E-mail enviado para o avaliador'
				})
			}
		} catch (error) {
			return this.res.status(500).json({
				type: 'error', message: 'Ocorreu um erro no envio do e-mail', errorDetails: error
			})
		}
	}

	updateStatus(status) {
		return this.dao.updateStatus(models.Evaluation, this.req.params.id, status)
			.then(() => {
				return this.res.status(200).json({
					type: 'success',
					message: 'A avaliação foi concluída com sucesso!'
				})
			})
			.catch((error) => {
				return this.req.status(500).json({
					type: 'error',
					message: 'Ocorreu um erro ao atualizar o status',
					errorDetails: error
				})
			})
	}
}
