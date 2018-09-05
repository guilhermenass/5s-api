var db = require('../models/index');

module.exports = class QuestionDAO {
    getQuestionsByEnviromentTypeId(models, enviromentTypeId) {

        return models.EnviromentTypeQuestion.findAll({
            include: [{
                model: models.Question,
                require: true  
            }],  
            where: {
                enviroment_types_id: enviromentTypeId
            }
        })
    }
}

