var db = require('../models/index')

module.exports = class AuditDAO {

	constructor() {}

	/** Método especifico para carregar as auditorias */
	load() {
		return db.sequelize.query(
			`select 
                a.id, a.title, a.initial_date, a.due_date, a.description,
                e.id as evaluation_id, e.enviroments_id, e.users_id, e.date, e.status,
                env.name as enviroment_name,
                us.name as user_name,
                u.id as units_id, u.name as unit_name
                from audits a
                inner join evaluations e on a.id = e.audits_id
                inner join enviroments env on env.id = e.enviroments_id
                inner join units u on u.id = env.units_id
                inner join users us on us.id = e.users_id`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
}