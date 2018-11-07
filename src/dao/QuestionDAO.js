var db = require('../models/index')
module.exports = class QuestionDAO {

	/**Primeira avaliação */
	getQuestionsByEnviromentTypeId(models, enviromentTypeId) {
        return db.sequelize.query(
            `select q.id, q.title, q.sense, q.description from enviroment_types_has_questions ethq
            inner join questions q on q.id = ethq.questions_id
            where ethq.enviroment_types_id = ${enviromentTypeId}`,
            { type: db.sequelize.QueryTypes.SELECT }
        )
    }

	/**Reavaliação */
	getQuestionsInRevaluation(evaluationId){
		return db.sequelize.query(
			`select distinct on (q.id) q.id, q.title, q.sense, a.id as answerId from evaluations e
			inner join answers a on a.evaluations_id = e.id
			inner join questions q on q.id = a.questions_id
			where a.status = 0 and e.status = 3 and e.id  = ${evaluationId}`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
	/**Responsável*/
	getNonCompliancesByEvaluationId(evaluationId) {
		return db.sequelize.query(
			`select distinct on (q.id) q.id, q.title, a.comments from evaluations e
			inner join answers a on a.evaluations_id = e.id
			inner join questions q on q.id = a.questions_id
			where a.status = 0 and e.status = 1 and e.id = ${evaluationId}`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
}

