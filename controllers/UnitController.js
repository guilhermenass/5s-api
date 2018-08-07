var models = require('../models');
var db = require('../models/index');

module.exports = class UnitController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(unit){
        models.Unit.create(unit)    
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Unidade salva com sucesso'
            })
        })
        .catch((error) => {   
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar', errorDetails: error
            });
        });
    }

    load(){ 
        models.Unit.findAll({})
        .then(units => {
            return this.res.json(units);
        })
        .catch((error) => {
            return this.res.status(500).json({
                message: 'Ocorreu um erro ao tentar carregar as unidades', errorDetails: error
            });
        });
    }

    update(unit){
        return models.Unit.update(unit,
        { 
            where: { id: unit.id }
        })
        .then(res => {
            return this.res.status(200).json({type: 'success', message: 'Unidade salva com sucesso!'})
        })
        .catch((err) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao atualizar a unidade', errorDetails: err
            });
        });
    }

    remove(){
        models.Unit.destroy({
            where: {    
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', message: "Unidade removida com sucesso!"
                });         
            else
                return this.res.status(404).json({
                    type: 'error', message: "Registro não encontrado!"
                }); 
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Erro de servidor', errorDetails: error
            }); 
        })
    }

    getUnitByEnviromentType() {
        db.sequelize.query(
            "select distinct u.id, u.name from enviroments e " +
            "inner join enviroment_types_has_questions ethq on ethq.enviroment_types_id = e.enviroment_types_id " +
            "inner join units u on u.id = e.units_id " +
            "where ethq.questions_id = " + this.req.params.questionId,
            { type: db.sequelize.QueryTypes.SELECT }
        )
        .then(unit => {
            return this.res.status(200).json(unit[0].id) // retorna sempre uma unidade
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Erro de servidor', errorDetails: error
            });
        })
    }
}