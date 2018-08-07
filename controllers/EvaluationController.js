var models = require('../models');

module.exports = class EvaluationController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    load() {
        models.Evaluation.findAll({
            include: [models.User, models.Enviroment]
        })
        .then(evaluations => {
            return this.res.json(evaluations);
        })
        .catch((error) => {
            return this.res.status(500).json({
                errorDetails: error
            });
        });
    }

    save(evaluation){
        let evaluationToSave = this.mountEvaluations(evaluation);
        
        models.Evaluation.bulkCreate(evaluationToSave)
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Avaliação salva com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar!', errorDetails: error
            })
        })
    }

    mountEvaluations(evaluation) {
        let evaluationToSave = [];
        evaluation["enviroments_id"].forEach(enviromentId => {
            evaluationToSave.push({
                users_id: evaluation.users_id,
                enviroments_id: enviromentId,
                createDate: evaluation.createDate,
                dueDate: evaluation.dueDate,
                title: evaluation.title,
                status: evaluation.status,
                description: evaluation.description
            })
        })

        return evaluationToSave;
    }

    update(evaluation){
        return models.Evaluation.update(evaluation,
        { 
            where: {id: evaluation.id}
        })
        .then(res => {
            return this.res.status(200).json({
                type: 'success', message: 'Avaliação salva com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar!', errorDetails: error
            });
        });
    }

    remove() {
        models.Evaluation.destroy({
            where: {    
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', message: "Removido com sucesso!"
                }); 
            else
                return this.res.status(404).json({
                    type: 'error', message: "Registro não encontrado!"
                })        
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: "Erro de servidor!", errorDetails: error
            }); 
        })
    }
}