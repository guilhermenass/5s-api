var genericDAO = require('../dao/GenericDAO');
var models = require('../models');

module.exports = class EvaluationController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.dao = new genericDAO();
    }

    save(obj) {
        var evaluationDto = this.createDto(obj);
        this.dao.bulkCreate(models.Evaluation, evaluationDto)
        .catch((error) => {
            console.log(error);
        })
    }

    createDto(obj) {
        let evaluationDto = [];

        obj.evaluations.enviroments_id.forEach(enviromentId => {
           evaluationDto.push({
               enviroments_id: enviromentId,
               units_id: obj.evaluations.units_id,
               users_id: obj.evaluations.users_id,
               audits_id: obj.id,
               status: 0
            })
        });

        return evaluationDto;
    }
}

