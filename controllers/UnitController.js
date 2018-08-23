var models = require('../models');
var genericDAO = require('../dao/GenericDAO');
var unitDAO = require('../dao/UnitDAO');

module.exports = class UnitController {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.dao = new genericDAO();
    }

    save(unit){
        this.dao.save(models.Unit, unit)
        .then(() => {
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
        this.dao.load(models.Unit)
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
        this.dao.update(models.Unit, unit)
        .then(() => {
            return this.res.status(200).json({type: 'success', message: 'Unidade salva com sucesso!'})
        })
        .catch((err) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao atualizar a unidade', errorDetails: err
            });
        });
    }

    remove(){
        this.dao.remove(models.Unit, this.req.params.id)
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
        new unitDAO().loadUnitByEnviromentType()     
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