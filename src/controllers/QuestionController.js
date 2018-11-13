var models = require('../models')
var genericDAO = require('../dao/GenericDAO')
var questionDAO = require('../dao/QuestionDAO')

module.exports = class Question {
	constructor(req, res){
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	save(question) {
		this.dao.save(models.Question, question)
		.then(res => {
			return this.res.status(201).json({
				type:'success',
				message: 'Pergunta salva com sucesso',
				questions_id: res.id,
				enviroment_types_id: question.enviroment_types_id
			})
		})
		.catch((error) => {   
			return this.res.status(500).json({errorDetails: error})       
		})
	}

	load() {
		this.dao.load(models.Question)
		.then(questions => {
			return this.res.status(200).json(questions)
		})
		.catch((error) => {
			return this.res.status(500).json({errorDetails: error})
		})
	}

	update(question) {
		this.dao.update(models.Question, question)
		.then(() => {
			return this.res.status(200).json({
				type: 'success',
				message: 'Pergunta salva com sucesso!'
			})
		})
		.catch((error) => {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao tentar atualizar',
				errorDetails: error
			})
		})
	}

	remove() {
		this.dao.remove(models.Question, this.req.params.id)
		.then((deletedRecord) => {
			if(deletedRecord)
				return this.res.status(200).json({
					type: 'success',
					message: 'Pergunta removida com sucesso!'
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

	saveInAssociateTable(relatedIds) {
		var idsToInsert = []
		relatedIds.enviromentTypeId.forEach(envtypeId => {
			idsToInsert.push({questions_id: relatedIds.questionId, enviroment_types_id: envtypeId})
		})
		this.dao.bulkCreate(models.EnviromentTypeQuestion, idsToInsert)
		.then(() => {})
		.catch((error) => {   
			return this.res.status(500).json({
				errorDetails: error
			})       
		})
	}

	getRelatedItems(question) {
		this.dao.loadAssociatedItems(question.id)
		.then(questions => {
			return this.res.status(200).json(questions)
		})
		.catch((error) => {
			return this.res.status(500).json({errorDetails: error})
		})
	}

	getQuestionsByEnviromentTypeId(enviromentTypeId) {
		new questionDAO().getQuestionsByEnviromentTypeId(models, enviromentTypeId)
		.then(questions => {
			if(questions.length == 0) 
				return this.res.status(404).json({
					msg: 'Nenhuma pergunta foi cadastrada para este tipo de ambiente'
				})
			else {
				return this.res.status(200).json(questions)
			}
		})
		.catch((error) => {
			return this.res.status(500).json({errorDetails: error})
		})
	}

	getQuestionsInRevaluation(evaluationId) {
		new questionDAO().getQuestionsInRevaluation(evaluationId)
		.then(questions => {
			if(questions.length == 0) 
				return this.res.status(404).json({
					msg: 'Nenhuma pergunta foi cadastrada para este tipo de ambiente'
				})
			else
				return this.res.status(200).json(questions)
		})
		.catch((error) => {
			return this.res.status(500).json({errorDetails: error})
		})
	}

	getNonCompliancesByEvaluationId(evaluationId) {
		new questionDAO().getNonCompliancesByEvaluationId(evaluationId)
		.then(questions => {
			if(questions.length == 0) 
				return this.res.status(404).json({
					msg: 'Nenhuma pergunta foi cadastrada para este tipo de ambiente'
				})
			else
				return this.res.status(200).json(questions)
		})
		.catch((error) => {
			return this.res.status(500).json({errorDetails: error})
		})
	}
}