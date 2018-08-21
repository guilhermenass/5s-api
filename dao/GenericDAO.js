module.exports = class GenericDAO {

    constructor(){}

    /* método genérico de save */
    save(model, entity) {
        return model.create(entity)
    }
    
    /* método genérico para retornar todos os dados de acordo com o model e sem condicionais */
    load(model, models) {
        console.log('models',models)
        if(models)
            return model.findAll({models})
        return model.findAll({})
    }
    
    /* método que carrega por um id especifico */
    loadById() {
    
    }
    
    /* remove um determinado registro de acordo com o id */
    remove(model, id) {
        return model.destroy({ where: { id: id} })
    }
    
    /* atualiza dados de uma entidade de acordo com um id */
    update(model, entity) {
        return model.update(entity, { where: { id: entity.id } })
    }
}