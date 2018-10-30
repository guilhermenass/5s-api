var db = require('../models/index')
module.exports = class QuestionDAO {
	getQuestionsByEnviromentTypeId(models, enviromentTypeId) {

		return models.EnviromentTypeQuestion.findAll({
			include: [{
				model: models.Question
			}],  
			where: {
				enviroment_types_id: enviromentTypeId
			}
		})
	}

	getNonCompliancesByEvaluationId(evaluationId) {
		return db.sequelize.query(
			`select distinct on (q.id) q.id, q.title, a.comments from evaluations e
			inner join answers a on a.evaluations_id = e.id
			inner join questions q on q.id = a.questions_id
			where a.status = 0 and e.id = ${evaluationId};`,
			{ type: db.sequelize.QueryTypes.SELECT }
		)
	}
}

