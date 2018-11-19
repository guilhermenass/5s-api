var genericDao = require('../dao/GenericDAO')

module.exports = class ReportController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.dao = new genericDao()
    }

    filter(auditId) {
        this.dao.filter(auditId)
        .then(res => {
            return this.res.status(200).json(res)
        })
        .catch((error) => {
            return this.res.status(400).json({
                errorDetails: error
            })
        })
        
    }
}