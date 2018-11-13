var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var models  = require('../models')
var genericDAO = require('../dao/GenericDAO')

module.exports = class AuthController {
	constructor(req, res){
		this._req = req
		this._res = res
		this.dao = new genericDAO()
	}

	async authenticate(){
		var email = this._req.body.email
		var password = this._req.body.password

		try {
			const data = await this.dao.loadByEmail(models.User, email) 
            
			if(data){
				var isValid =  bcrypt.compareSync(password, data.password)
				if(isValid){
					var user = ({
						id: data.id,
						email: email,
						name: data.name,
						profile: data.profile
					})
					var token = jwt.sign(user, process.env.SECRET_KEY, {
						expiresIn: '40 days'
					})
                    
					this._res.json({
						token: token,
						isAuth: true
					})
                    
				} else
					this._res.status(401).send('A senha está incorreta!')
                
			} else 
				this._res.status(401).send('Usuário não encontrado!')
			
		} catch(err) {
			this._res.status(500).send('Ocorreu um erro ao tentar realizar o login' + err)
		}    
	}

	async authenticateApp(){
		var email = this._req.body.email
		var password = this._req.body.password

		try {
			const data = await this.dao.loadByEmail(models.User, email)
			if(data){
				var isAuthenticated =  bcrypt.compareSync(password, data.password)
				if(isAuthenticated){
					if(data.profile > 1){
						var user = ({
							id: data.id,
							email: email,
							userName: data.userName,
							name: data.name,
							profile: data.profile
						})
						var token = jwt.sign(user, process.env.SECRET_KEY, {
							expiresIn: '40 days'
						})
                        
						this._res.json({
							token: token,
							isAuth: true,
							profile: data.profile
						})
					} else
						this._res.status(401).send('Usuário não autorizado')
				} else
					this._res.status(401).send('Dados incorretos')
                
			} else 
				this._res.status(401).send('Usuário não encontrado')
			
		} catch(err) {
			this._res.status(500).send('Ocorreu um erro ao tentar realizar o login' + err)
		}    
	}
}