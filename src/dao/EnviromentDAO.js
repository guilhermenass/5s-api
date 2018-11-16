var models = require('../models')
var db = require('../models/index')

module.exports = class EnviromentDAO {

	constructor() {}

	/** Carrega todas os ambientes, com inner join com */
	load() {
		return models.Enviroment.findAll({
			where: {
				is_active: true
			},
			include: [models.Unit, models.User, models.EnviromentType]
		})
	}

	/** Carrega todos os ambientes que possuem perguntas cadastradas e de acordo com a unidade */
	loadEnviromentsByUnit(unitId) {
		return db.sequelize.query(
			`select e.id, e.name from enviroments e
			where e.enviroment_types_id in 
			(select etqh.enviroment_types_id from enviroment_types_has_questions etqh)
			and e.units_id = ${unitId} and e.is_active = true`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
}