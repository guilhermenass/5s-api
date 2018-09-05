var db = require('../models/index');

module.exports = class UnitDAO {
    loadUnitByEnviromentType(questionId) {
        return db.sequelize.query(
            "select distinct u.id, u.name from enviroments e " +
            "inner join enviroment_types_has_questions ethq on ethq.enviroment_types_id = e.enviroment_types_id " +
            "inner join units u on u.id = e.units_id " +
            "where ethq.questions_id = " + questionId,
            { type: db.sequelize.QueryTypes.SELECT }
        )
    }
}

