var models = require('../models');
var db = require('../models/index');

module.exports = class AuditDAO {

    constructor() {}

    /** Método especifico para carregar as auditorias */
    load() {
        return db.sequelize.query(
            'select * from audits a inner join evaluations e on a.id = e.audits_id',
            { type: db.sequelize.QueryTypes.SELECT }
        );
    }
}