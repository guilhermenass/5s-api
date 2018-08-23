var models = require('../models');

module.exports = class AuditDAO {

    constructor() {}

    /** Método especifico para carregar as auditorias, pois tem inner join
     * com outras entidades */
    load() {
        return models.Audit.findAll({
            include: [models.User, models.Enviroment]
        })
    }
}