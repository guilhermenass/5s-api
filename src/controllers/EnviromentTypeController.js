var models = require('../models')
var db = require('../models/index')
var genericDAO = require('../dao/GenericDAO')

module.exports = class EnviromentTypeController {
	constructor(req, res){
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	save(enviromentType){
		this.dao.save(models.EnviromentType, enviromentType)
		.then(() => {
			return this.res.status(201).json({
				type: 'success',
				message: 'Tipo de ambiente salvo com sucesso!'
			})
		})
		.catch((error) => {   
			return this.res.status(500).json({
				message: 'Ocorreu um erro ao tentar salvar',
				errorDetails: error
			})
		})
	}

	load(){
		this.dao.load(models.EnviromentType) 
		.then(enviromentTypes => {
			return this.res.json(enviromentTypes)
		})
		.catch((error) => {
			return this.res.status(500).json({
				errorDetails: error
			})
		})
	}

	update(enviromentType){
		this.dao.update(models.EnviromentType, enviromentType)
		.then(() => {
			return this.res.status(200).json({
				type: 'success',
				message: 'Tipo de ambiente salvo com sucesso!'
			})
		})
		.catch((error) => {
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao tentar atualizar!',
				errorDetails: error
			})
		})
	}

	remove(){
		this.dao.remove(models.EnviromentType, this.req.params.id )
		.then((deletedRecord) => {
			if(deletedRecord)
				return this.res.status(200).json({
					type: 'success',
					message: 'Removido com sucesso!'
				})         
			else
				return this.res.status(404).json({
					type: 'error',
					message: 'Registro não encontrado!'
				}) 
		})
		.catch((error) => {
			return this.res.status(500).json({
				type: 'warning',
				message: 'Não é possível remover um tipo de ambiente que está vinculado a um ambiente',
				errorDetails: error
			}) 
		})
	}

	removeAssociatedItems(questionId) {
		this.dao.removeAssociatedItems(questionId)
		.then(() => {
			return this.res.status(200).json({
				type: 'success',
				msg: 'Tipos de ambientes foram removidos!'
			})
		})
		.catch((error) =>{
			return this.res.status(500).json({
				errorDetails: error
			})
		})
	}

	loadEnviromentsTypeByUnit() {
		this.dao.loadEnviromentsTypeByUnit(this.req.params.unitId)
		.then(enviroments => {
			return this.res.status(200).json(enviroments)
		})
		.catch((error) =>{
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao tentar carregar',
				errorDetails: error
			})
		})
	}
}