var models = require('../models')
module.exports = class AuditDAO {

	constructor() { }

	load(model) {
		return model.findAll({
			order: [
				['id', 'DESC']
			],
			where: {
				is_active: true
			},
			include:
            [{
            	model: models.Evaluation,
            	attributes: ['id', 'date'],
            	include: 
                [{
                	model: models.Enviroment,
                	attributes: ['id', 'name'],
                	include: [{
                		model: models.Unit,
                		attributes: ['id', 'name']
                	}],
                },
                {
                	model: models.User,
                	attributes: ['id', 'name', 'email']
                }]        
            }]
		})
	}
}