var models = require('../models');
var genericDAO = require('../dao/GenericDAO');

module.exports = class AuditController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.dao = new genericDAO();
    }

    load() {
        this.dao.load(models.Audit, [].push(models.User, models.Enviroment))
        .then(audits => {
            return this.res.json(audits);
        })
        .catch((error) => {
            return this.res.status(500).json({
                errorDetails: error
            });
        });
    }

    save(audit){
        let auditToSave = this.mountAudits(audit);
        models.Audit.bulkCreate(auditToSave)
        .then(res => {
            return this.res.status(201).json({
                type: 'success', message: 'Auditoria salva com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar!', errorDetails: error
            })
        })
    }

    mountAudits(audit) {
        let auditToSave = [];
        audit["enviroments_id"].forEach(enviromentId => {
            auditToSave.push({
                users_id: audit.users_id,
                enviroments_id: enviromentId,
                createDate: audit.createDate,
                dueDate: audit.dueDate,
                title: audit.title,
                status: audit.status,
                description: audit.description,
                current_responsible: audit.users_id
            })
        })

        return auditToSave;
    }

    update(audit){
        return models.Audit.update(audit,
        { 
            where: {id: audit.id}
        })
        .then(res => {
            return this.res.status(200).json({
                type: 'success', message: 'Auditoria salva com sucesso!'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao tentar salvar!', errorDetails: error
            });
        });
    }

    remove() {
        models.Audit.destroy({
            where: {    
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success', message: "Exclusão realizada com sucesso!"
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