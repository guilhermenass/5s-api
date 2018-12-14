var genericDAO = require('../dao/GenericDAO')
var models = require('../models')
var emailController = require('./EmailController')

module.exports = class EvaluationController {
	constructor(req, res) {
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	async save(audit) {
		var evaluationDto = this.createDto(audit)
		this.dao.bulkCreate(models.Evaluation, evaluationDto)
		.then((res) => {
			return this.res.json(res)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	loadByAppraiserId(appraiserId) {
		this.dao.loadByAppraiserId(appraiserId)
		.then(evaluations => {
			return this.res.json(evaluations)
		})
		.catch((error) => {
			return this.res.status(400).json({
				errorDetails: error
			})
		})
	}

	loadByResponsibleId(responsibleId) {
		this.dao.loadByResponsibleId(responsibleId)
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
		audit.evaluations.forEach(evaluation => {
				auditDto.push({
					enviroments_id: evaluation.environments_id,
					users_id: evaluation.users_id,
					audits_id: audit.id,
					current_responsible: evaluation.users_id,
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
				evaluations_id: element.evaluateId,
				comments: element.comments
			})
		})
		this.dao.bulkCreate(models.Answer, dto)
		.then(() => {
			return this.res.status(201).json({
				type: 'success',
				message: 'Avaliação finalizada com sucesso!'
			})
		})
		.catch((error) => {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao salvar!',
				errorDetails: error
			})
		})
	}
	updateAnswersEvaluation(answer) {
		answer.forEach(element => {
			var obj ={
				id: element.id,
				status: element.status ? 1 : 0, // 0 = negativo, 1 = positivo
				questions_id: element.questionId,
				evaluations_id: element.evaluateId,
				comments: element.comments
			}
			this.dao.update(models.Answer, obj)			
			.then(() => {
				return this.res.status(201).json({
					type: 'success',
				})
			})
			.catch((error) => {
				return this.res.status(500).json({
					type: 'error',
					message: 'Ocorreu um erro ao tentar salvar!',
					errorDetails: error
				})
			})
		});
	}

	async sendEmailSuccessful() {
		let isSent = false
		try {
			isSent = await new emailController().sendEmailSuccessfulEvaluation()
			if (isSent) {
				return this.res.status(200).json({
					type: 'success',
					message: 'E-mail enviado para o avaliador'
				})
			}
		} catch (error) {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro no envio do e-mail',
				errorDetails: error
			})
		}
	}

	async sendEmailWithNonCompliances(nonCompliances) {
		let isSent = false
		try {
			isSent = await new emailController().sendEmailWithNonCompliances(nonCompliances)
			if (isSent) {
				return this.res.status(200).json({
					type: 'success',
					message: 'E-mail enviado para o avaliador'
				})
			}
		} catch (error) {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro no envio do e-mail',
				errorDetails: error
			})
		}
	}

	async sendEmailSchedulingEvaluation() {
		let isSent = false
		try {
			isSent = await new emailController().sendEmailSchedulingEvaluation()
			if (isSent) {
				return this.res.status(200).json({
					type: 'success',
					message: 'E-mail enviado para o avaliador'
				})
			}
		} catch (error) {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro no envio do e-mail',
				errorDetails: error
			})
		}
	}

	updateEvaluation(evaluationDto) {
		let message = this.getMessage(evaluationDto.status);
		let evaluation = this.mountEvaluation(evaluationDto);
		return this.dao.updateEvaluation(models.Evaluation, this.req.params.id, evaluation)
		.then(() => {
			return this.res.status(200).json({
				type: 'success',
				message: message
			})
		})
		.catch((error) => {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao atualizar o status',
				errorDetails: error
			})
		})
	}

	/**
	 * Método que retorna a mensagem que informa se a avaliação foi concluida ou está
	 * pendente com o responsável do ambiente.
	 * @param {Status da avaliação} status 
	 */ 
	getMessage(status) {
		let message = "";
		if(status == 1)
			message = "A avaliação foi transferida para o responsável do ambiente, para corrigir as não conformidades encontradas";
		else if(status == 2)
			message = "Avaliação concluída com sucesso";
		else 
			message = "Avaliação está disponível para reavaliação do avaliador";
		
		return message;
	}

	verifyEvaluationStatus(evaluationId) {
		return this.dao.verifyEvaluationStatus(models.Evaluation, evaluationId)
		.then(evaluation => {
			return this.res.status(200).json(evaluation)
		})
		.catch((error) => {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao consultar avaliação',
				errorDetails: error
			})
		})
	}

	/**
	 * Método para verificar se a nota foi gerada ou não.
	 * Só deve atualizar a nota, se for a primeira avaliação.
	 */
	mountEvaluation(evaluationDto) {
		var evaluation = {
			status: evaluationDto.status,
			date: new Date(),
			current_responsible: evaluationDto.userId
		}
		if(evaluationDto.grade != null)
			evaluation.grade = evaluationDto.grade;
		
		return evaluation;
	}

	async remove(evaluationId) {
		this.dao.removeFromDb(models.Evaluation, evaluationId)
		.then((res) => {
			return this.res.status(200).json({
				type: 'success',
				message: 'Removido com sucesso!'
			})
		})
		.catch((error) => {
			return this.res.status(500).json({msg: error})
		})
	}
}

