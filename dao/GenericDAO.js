var db = require('../models/index');
const op = db.Sequelize.Op;

module.exports = class GenericDAO {

    constructor() {}

    /* método genérico de save */
    save(model, entity) {
        return model.create(entity)
    }

    /* método para salvar mais de um registro */
    bulkCreate(model, entity) {
        return model.bulkCreate(entity);
    }
    
    /* método genérico para retornar todos os dados de acordo com o model e sem condicionais */
    load(model) {
        return model.findAll({})
    }

    /* método que carrega dados de acordo com o e-mail */
    loadByEmail(model, email) {
        return model.findOne({ where: { email: email }} )
    }
    
    /* método que carrega por um id especifico */
    loadById() {
    
    }

    /* método que busca os usuários sem o atributo senha */
    loadWithoutPassword(model) {
        return model.findAll({
            attributes: { exclude: ['password'] }
        })
    }

    /* retorna as pendências de acordo com o id do responsável */
    loadByAppraiserId(model, userId) {
        model.findAll({
            where: {
                [op.or]: [ 
                    {users_id: userId},
                    {current_responsible: userId}
                ]
            }
        })
    }
        
    /* remove um determinado registro de acordo com o id */
    remove(model, id) {
        return model.destroy({ where: { id: id} })
    }
    
    /* atualiza dados de uma entidade de acordo com um id */
    update(model, entity) {
        return model.update(entity, { where: { id: entity.id } })
    }

    /* método responsável por atualizar a senha do usuário com criptografia */
    updatePassword(model, userId, password) {
        return model.update({ password: password },
            { 
                where: { id: userId }
            })
    }
}