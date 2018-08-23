var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt-nodejs')
var models  = require('../models');
var emailController = require('./EmailController');
var genericDAO = require('../dao/GenericDAO')

module.exports = class UserController {
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.dao = new genericDAO();
    }

    save(user){
        user.password = this.generateHash(user.password);        
        this.dao.save(models.User, user)
        .then(() => {
            return this.res.status(201).json({
                type: 'success', message: 'Usuário salvo com sucesso!'
            })
        })
        .catch((error) => {   
            return this.res.status(500).json({
                type: 'error', message: 'Ocorreu um erro ao salvar!', errorDetails: error
            });
        });
    }

    update(user){
        if(user.password)
            user.password = this.generateHash(user.password); 
        else
            delete user.password

        this.dao.update(models.User, user)
        .then(() => {
            return this.res.status(200).json({
                type: 'success', message: 'Usuário salvo com sucesso'
            })
        })
        .catch((error) => {
            return this.res.status(500).json({
                type: 'error', message: err, errorDetails: error
            });
        });
    }

    updatePassword(user) {

        if(user.password) {
            var encryptedPassword = this.generateHash(user.password); 

            // model, userId, password
            this.dao.updatePassword(models.User, user.id, encryptedPassword)
            .then(() => {
                return this.res.status(200).json({
                    type: 'success', message: 'Senha alterada com sucesso'
                })
            })
            .catch((error) => {
                return this.res.status(500).json({
                    type: 'error', message: err, errorDetails: error
                });
            })
        }
    }
    
    load(){
        this.dao.loadWithoutPassword(models.User)
        .then(users => {
            return this.res.json(users);
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        });
    }
    
    remove(){
        this.dao.remove(models.User, this.req.params.id)
        .then((deletedRecord) => {
            if(deletedRecord)
                return this.res.status(200).json({
                    type: 'success',  message: 'Removido com sucesso!'
                });         
            else
                return this.res.status(404).json({
                    type:'error', message: 'Registro não encontrado!'
                }); 
        })
        .catch((error) => {
            return this.res.status(500).json({
                type:'error', message: "Erro de servidor", errorDetails: error
            }); 
        })
    }

    generateHash(password){
        var salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        return password;
    }

    async verifyEmail(){
        let email = this.req.query.email;

        this.dao.loadByEmail(models.User, email)
        let data = await this.dao.loadByEmail(models.User, email)

        if(data){
            let user = ({
                id: data.id,
                email: email,
                name: data.name
            })

            var token = jwt.sign(user, process.env.SECRET_KEY, {
                 expiresIn: '6h'
            });           

            const emailWasSent = await new emailController().sendEmail(token, user);
            if(emailWasSent)
                return this.res.status(201).json({msg: 'E-mail enviado com sucesso para ' + email})

        } else {
            this.res.status(404).json({msg: 'Este e-mail não existe na base de dados!'});
        }
    }


    async validateFirstAccess(){
        var email = this.req.body.email;

        try {
            const data = await this.dao.loadByEmail(models.User, email)

            if(data){
               var isAuthenticated = bcrypt.compareSync('newPasswordFirstAccess', data.password);

                if(isAuthenticated){
                    var user = ({
                        id: data.id,
                        email: email,
                        name: data.name,
                        profile: data.profile
                    })
                    var token = jwt.sign(user, process.env.SECRET_KEY, {
                        expiresIn: 400000
                    });
                    
                    this.res.json({
                        id: data.id,
                        isFirstAccess: true
                    });
                    
                }else
                    this.res.status(401).send("Usuario já realizou o primeiro acesso");
                
            } else 
                this.res.status(401).send("Usuário não encontrado");
			
        } catch(err) {
            this.res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }

    async firstAccess(){
        var id = this.req.body.id;
        var password = this.req.body.password;
    
        try {
            const data = await models.User.findOne({
                where: {
                    id: id
                }           
            });

            if(data){
               var isAuthenticated =  bcrypt.compareSync('newPasswordFirstAccess', data.password);
                password = this.generateHash(password);
     
                return models.User.update({password: password}, { where: { id: id }})
                .then(res => {
                    return this.res.status(200).json({
                        type: 'success', message: 'Senha cadastrada com sucesso'
                    })
                })
                .catch((error) => {
                    return this.res.status(500).json({
                        type: 'error', message: err, errorDetails: error
                    });
                });
            }else
                this.res.status(401).send("Usuario já realizou o primeiro acesso");
			
        } catch(err) {
            this.res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }
}