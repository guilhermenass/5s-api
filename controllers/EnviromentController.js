var models = require('../models');

module.exports = class EnviromentController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(enviroment){
        models.Enviroment.create(enviroment)    
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Ambiente salvo com sucesso!'
            })
        })
        .catch((error) => {       
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar!', errorDetails: error
            });
        });
    }

    load(){ 
        models.Enviroment.findAll({
            include: [models.Unit, models.User, models.EnviromentType]
        })
        .then(enviroments => {
            return this.res.json(enviroments);  
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        });
    }

    update(enviroment){
        return models.Enviroment.update(enviroment,
        { 
            where: { id: enviroment.id }
        })
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Ambiente salvo com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar!', errorDetails: error
            });
        });
    }

    remove(){
        models.Enviroment.destroy({
            where: {
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', status: 200, message: "Removido com sucesso!"
                });         
            else
                return this.res.json({
                    type: 'error', status: 404, message: "Registro não encontrado!"
                }); 
        })
        .catch((error) => {
            return this.res.json({
                type: 'error', status: 500, message: "Erro de servidor", errorDetails: error
            }); 
        })
    }

    loadEnviromentsByUnit() {
        models.Enviroment.findAll({
            where: {
                units_id: this.req.params.unitId
            }
        })
        .then(enviroments => {
            return this.res.status(200).json(enviroments)
        })
        .catch((error) =>{
            return this.res.status(500).json({
                type: 'error', message: "Erro de servidor", errorDetails: error
            })
        })
    }
}