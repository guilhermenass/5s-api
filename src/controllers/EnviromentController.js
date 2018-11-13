var models = require('../models')
var genericDAO = require('../dao/GenericDAO')
var enviromentDAO = require('../dao/EnviromentDAO')

module.exports = class EnviromentController {
	constructor(req, res){
		this.req = req
		this.res = res
		this.dao = new genericDAO()
	}

	save(enviroment){
		this.dao.save(models.Enviroment, enviroment)
		.then(() => {
			return this.res.status(201).json({
				type: 'success',
				message: 'Ambiente salvo com sucesso!'
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

	load(){ 
		new enviromentDAO().load()
		.then(enviroments => {
			return this.res.json(enviroments)  
		})
		.catch((error) => {
			return this.res.status(500).json({
				errorDetails: error
			})
		})
	}

	update(enviroment){
		this.dao.update(models.Enviroment, enviroment)
		.then(() => {
			return this.res.status(201).json({
				type: 'success',
				message: 'Ambiente salvo com sucesso!'
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

	remove(){
		this.dao.remove(models.Enviroment, this.req.params.id)
		.then((deletedRecord) => {
			if(deletedRecord) {
				return this.res.status(200).json({
					type: 'success',
					status: 200,
					message: 'Ambiente removido com sucesso!'
				})         
			} else {
				return this.res.json({
					type: 'error',
					status: 404,
					message: 'Registro não encontrado!'
				})
			}
		})
		.catch((error) => {
			return this.res.json({
				type: 'error',
				status: 500,
				message: 'Ocorreu um erro ao tentar remover',
				errorDetails: error
			}) 
		})
	}

	loadEnviromentsByUnit() {
		models.Enviroment.findAll({
			where: {
				units_id: this.req.params.unitId
			}
		})
		.then(enviroments => {
			return this.res.status(200).json(enviroments)
		})
		.catch((error) =>{
			return this.res.status(500).json({
				type: 'error',
				message: 'Ocorreu um erro ao tentar remover',
				errorDetails: error
			})
		})
	}
}