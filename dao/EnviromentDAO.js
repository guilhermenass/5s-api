var models = require('../models');

module.exports = class EnviromentDAO {

    constructor() {}

    /** Carrega todas os ambientes, com inner join com */
    load() {
        return models.Enviroment.findAll({
            include: [models.Unit, models.User, models.EnviromentType]
        })
    }
}