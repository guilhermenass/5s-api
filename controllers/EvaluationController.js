var genericDAO = require('../dao/GenericDAO');
var models = require('../models');
var evaluationDAO = require('../dao/EvaluationDAO');

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

    loadByAppraiserId(responsibleId) {
        this.dao.loadByAppraiserId(responsibleId)
        .then(evaluations => {
            return this.res.json(evaluations);
        })
        .catch((error) => {
            return this.res.status(400).json({
                errorDetails: error
            })
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

    finishEvaluation(evaluation) {
        this.dao.save(models.Evaluation, evaluation)
        .then(() => {
            return this.res.status(201).json({
                type: 'success', message: 'Avaliação finalizada com sucesso!'
            })
        })
        .catch(error => {
            return this.res.status(400).json({
                type: 'error',
                message: 'Ocorreu um erro ao tentar finalizar a avaliação',
                errorDetails: error
            })
        })
    }
}

