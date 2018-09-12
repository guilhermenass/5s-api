var models = require('../models');
var auditDAO = require('../dao/AuditDAO')
var genericDAO = require('../dao/GenericDAO');

module.exports = class AuditController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.dao = new genericDAO();
    }

    load() {
        new auditDAO().load()
        .then(audits => {
            return this.res.json(audits);
        })
        .catch((error) => {
            return this.res.status(500).json({
                errorDetails: error
            });
        });
    }

    loadByAppraiserId(userId) {
        this.dao.loadByAppraiserId(models.Audit, userId)
        .then(audits => {
            return this.res.json(audits);
        })
        .catch((error) => {
            return this.res.status(400).json({
                errorDetails: error
            })
        })
    }

    save(audit){
        console.log()
        let evaluationDto = this.mountAudits(audit);
        this.dao.bulkCreate(models.Audit, evaluationDto)
        .then(() => {
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

    update(audit){
        this.dao.update(models.Audit, audit)
        .then(() => {
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
        this.dao.remove(models.Audit, this.req.params.id)
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
}