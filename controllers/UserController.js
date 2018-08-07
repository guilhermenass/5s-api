var jwt = require("jsonwebtoken");
var mysql = require('mysql')
var bcrypt = require('bcrypt-nodejs')
var models  = require('../models');
var emailController = require('./EmailController');

module.exports = class UserController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(user){
        user.password = this.generateHash(user.password);        

        models.User.create(user)    
        .then(res => {
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

        return models.User.update(user,
        { 
            where: { id: user.id }
        })
        .then(res => {
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

            console.log('encrypt', encryptedPassword)

            return models.User.update(
            { 
                password: encryptedPassword 
            },
            { 
                where: { id: user.id }
            })
            .then(res => {
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
        models.User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(users => {
            return this.res.json(users);
        })
        .catch((error) => {
            return this.res.status(500).json({errorDetails: error});
        });
    }
    
    remove(){
        models.User.destroy({
            where: {
                id: this.req.params.id  
            }
        })
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

        let data = await models.User.findOne({
            where: {
                email: email
            }
        })
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
        var cbFirstAccess = this.req.body.cbFirstAccess;

        try {
            const data = await models.User.findOne({
                where: {
                    email: email
                }           
            });

            if(data){
               var isAuthenticated =  bcrypt.compareSync('newPasswordFirstAccess', data.password);

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