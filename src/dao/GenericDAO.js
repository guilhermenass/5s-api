var db = require('../models/index')
const Op = db.Sequelize;
const models = require('../models')

module.exports = class GenericDAO {

	constructor() {}

	/**
	 * Método responsável pelo filtro da tela de relatórios
	 * @param {Identificador da auditoria} auditId 
	 */
	filter(auditId) {
		return db.sequelize.query(
			`select env.block, env.name as enviroment_name, eva.status, eva.grade, eva.date, u.name as appraiser, a.name as responsible
			from evaluations eva
			right join enviroments env on env.id = eva.enviroments_id
			right join users u on u.id = eva.users_id 
			right join users a on a.id = env.users_id 
			where audits_id = ${auditId}`,
			{type: db.sequelize.QueryTypes.SELECT}
		)
	}

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
		return model.findAll({
			where: { 
				is_active: true
			}
		})
	}

	/* método que carrega dados de acordo com o e-mail */
	loadByEmail(model, email) {
		return model.findOne({
			where: { 
				email: email,
				is_active: true
			}
		})
	}                                                                                                                                   


	/* método que carrega dados da tabela associativa enviroment_types_has_questions */
	loadAssociatedItems(model, questionId) {
		return model.findAll({
			include: [{
				model: models.Question,
				require: true  
			}],
			where: {
				questions_id: questionId 
			}
		})
	}

	/* método que busca os usuários sem o atributo senha */
	loadWithoutPassword(model) {
		return model.findAll({
			where: {
				is_active: true
			},
			include: [{
				model: models.Unit,
				attributes: ['name']
			}],
			attributes: { exclude: ['password'] }
		})
	}

	/* retorna as pendências de acordo com o id do avaliador */                                                                                                                                                                                                                                                           
	loadByAppraiserId(appraiserId) {
		return db.sequelize.query(
			`SELECT e.id, e.status, e.date as finish_date, e.users_id,
            env.name as enviroment_name, env.block as enviroment_block, env.enviroment_types_id as enviroment_type_id, env.users_id as responsible_id,
            a.title as audit_title, a.initial_date as audit_initial_date, a.due_date as audit_due_date,
			u.email
            FROM evaluations e
            inner join enviroments env on env.id = e.enviroments_id
            inner join audits a on a.id = e.audits_id
			left join users u on u.id = e.users_id
			where e.users_id = ${appraiserId} and e.status != 1 
			and e.current_responsible = ${appraiserId}
			and e.is_active = true`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
	 
	/* retorna as pendências de acordo com o id do responsável */                                                                                                                                                                                                                                                           
	loadByResponsibleId(responsibleId) {
		return db.sequelize.query(
			`SELECT e.id, e.status, e.date as finish_date, e.users_id as responsible_id,
			env.name as enviroment_name, env.block as enviroment_block, env.enviroment_types_id as enviroment_type_id,
			a.title as audit_title, a.initial_date as audit_initial_date, a.due_date as audit_due_date,
			u.email
			FROM evaluations e
			inner join enviroments env on env.id = e.enviroments_id
			inner join audits a on a.id = e.audits_id
			left join users u on u.id = e.users_id
			where env.users_id = ${responsibleId}
			and e.status = 1 and e.current_responsible = ${responsibleId}
			and e.is_active = true`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}

	loadEnviromentsTypeByUnit(unitId) {
		return db.sequelize.query(
			`select distinct et.name, et.id from enviroments e
             inner join enviroment_types et on et.id = e.enviroment_types_id 
			 where e.units_id = ${unitId}
			 and e.is_active = true`,
			{ type: db.sequelize.QueryTypes.SELECT })
	}

	loadResponsiblesByUnit(unitId) {
		return db.sequelize.query(
			`select u.id, u.name from users u
			 where units_id = ${unitId}
			 and profile > 3
			 and is_active = true`,
			{ type: db.sequelize.QueryTypes.SELECT}
		)
	}

	/**
	 * Método genérico para exclusão lógica dos dados
	 * @param {Model do banco de dados} model 
	 * @param {Identificador do registro que será deletado} id 
	 * @param {Se for nula, pega a coluna id, se não for, pega o parametro passado} paramName 
	 */
	remove(model, id) {
		return model.update(
			{
				is_active: false
			},
			{
			where: {
				id: id
			}
		})
	}

	/**
	 * 
	 * @param {Entidade a ser manipulada} model 
	 * @param {Identificador da questão} questionId 
	 */
	removeAssociatedItems(model, questionId) {
		return model.destroy({
			where: { 
				questions_id : questionId
			}
		})
	}

	/* atualiza dados de uma entidade de acordo com um id */
	update(model, entity) {
		return model.update(entity, { where: { id: entity.id } })
	}

	/* atualiza o status, nota, revisor atual e nota da avaliação */
	updateEvaluation(model, evaluationId, evaluation) {
		return model.update(evaluation,
		{
			where: { 
				id: evaluationId
			} 
		})
	}
	
	/* método responsável por atualizar a senha do usuário com criptografia */
	updatePassword(model, userId, password) {
		return model.update({ password: password },
		{ 
			where: { id: userId }
		})
	}

	verifyEvaluationStatus(model, evaluationId) {
		return model.findOne({
			where: {
				id: evaluationId
			}
		})
	}
}