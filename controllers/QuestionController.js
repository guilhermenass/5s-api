var models = require('../models');
var genericDAO = require('../dao/GenericDAO')

module.exports = class Question {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.dao = new genericDAO();
    }

    save(question) {
        this.dao.save(models.Question, question)
        .then(res => {
            return this.res.status(201).json({
                type:'success',
                message: 'Pergunta salva com sucesso',
                questions_id: res.id,
                enviroment_types_id: question.enviroment_types_id
            })
        })
        .catch((error) => {   
            return this.res.status(500).json({errorDetails: error});       
        });
    }

    load() {
        this.dao.load(models.Question)
        .then(questions => {
            return this.res.status(200).json(questions);
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        });
    }

    update(question) {
        this.dao.update(models.Question, question)
        .then(res => {
            return this.res.status(200).json({
                type: 'success', message: 'Pergunta salva com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar atualizar', errorDetails: error
            });
        });
    }

    remove() {
        this.dao.remove(models.Question, this.req.params.id)
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', message: "Pergunta removida com sucesso!"
                });         
            else
                return this.res.status(404).json({
                    type: 'error', message: "Registro não encontrado!"
                }); 
        })
        .catch((error) => {
            return this.res.status(500).json({type: 'error', message: "Erro de servidor", errorDetails: error}); 
        })
    }

    saveInAssociateTable(relatedIds) {
        var idsToInsert = [];
        relatedIds.enviromentTypeId.forEach(envtypeId => {
            idsToInsert.push({questions_id: relatedIds.questionId, enviroment_types_id: envtypeId})
        });
        models.EnviromentTypeQuestion.bulkCreate(idsToInsert)
        .then(res => {})
        .catch((error) => {   
            return this.res.status(500).json({errorDetails: error});       
        });
    }

    getRelatedItems(question) {
        models.EnviromentTypeQuestion.findAll({
            include: [{
                model: models.Question,
                require: true  
            }],
            where: {
                questions_id: question.id 
            }
        })
        .then(questions => {
            return this.res.status(200).json(questions);
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        })
    }
}