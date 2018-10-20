var db = require('../models/index')

module.exports = class GenericDAO {

	constructor() {}

	/* método genérico de save */
	save(model, entity) {
		return model.create(entity)
	}

	/* método para salvar mais de um registro */
	bulkCreate(model, entity) {
		return model.bulkCreate(entity)
	}
    
	/* método genérico para retornar todos os dados de acordo com o model e sem condicionais */
	load(model) {
		return model.findAll({})
	}

	/* método que carrega dados de acordo com o e-mail */
	loadByEmail(model, email) {
		return model.findOne({ where: { email: email }} )
	}                                                                                                                                   
    
	/* método que carrega por um id especifico */
	loadById() {
    
	}

	/* método que busca os usuários sem o atributo senha */
	loadWithoutPassword(model) {
		return model.findAll({
			attributes: { exclude: ['password'] }
		})
	}

	/* retorna as pendências de acordo com o id do responsável */                                                                                                                                                                                                                                                           
	loadByAppraiserId(responsibleId) {
		return db.sequelize.query(
			`SELECT e.id, e.date, e.status, e.date as finish_date,
            env.name as enviroment_name, env.block as enviroment_block, env.enviroment_types_id as enviroment_type_id, env.users_id,
			a.title as audit_title, a.initial_date as audit_initial_date, a.due_date as audit_due_date,
			u.email
            FROM evaluations e
            inner join enviroments env on env.id = e.enviroments_id
			inner join audits a on a.id = e.audits_id
			inner join users u on e.users_id = u.id
            where e.users_id = ${responsibleId} and e.current_responsible = ${responsibleId}`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
        
	/* remove um determinado registro de acordo com o id */
	remove(model, id) {
		return model.destroy({ where: { id: id} })
	}
    
	/* atualiza dados de uma entidade de acordo com um id */
	update(model, entity) {
		return model.update(entity, { where: { id: entity.id } })
	}

	/* atualiza o status da avaliação */
	updateStatus(model, evaluationId, status) {
		return model.update({status: status}, {where: { id: evaluationId} })
	}

	/* método responsável por atualizar a senha do usuário com criptografia */
	updatePassword(model, userId, password) {
		return model.update({ password: password },
			{ 
				where: { id: userId }
			})
	}
}