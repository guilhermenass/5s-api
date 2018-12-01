var models = require('../models')
var db = require('../models/index')
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
				where: { is_active: true },
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

	loadAuditsByUnit(unitId) {
		return db.sequelize.query(
			`select distinct on (au.id) au.id, au.title from enviroments env 
			inner join evaluations eval on eval.enviroments_id = env.id
			inner join audits au on au.id = eval.audits_id
			where env.units_id = ${unitId}
			and au.is_active = true`,
			{type: db.sequelize.QueryTypes.SELECT}
		)
	}
}