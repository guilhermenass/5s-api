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

	/**
	 * Método de autenticação único para webapp e aplicativo
	 */
	async authenticate(){
		var email = this._req.body.email
		var password = this._req.body.password

		try {
			const user = await this.dao.loadByEmail(models.User, email) 
			if(user){
				var isAuthenticated =  bcrypt.compareSync(password, user.password)
				if(isAuthenticated) {
					let token = this.setToken(user)
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

	/**
	 * Método que monta objeto de usuário e cria token para autenticação e validação
	 * @param {Usuário que solicitou login} user 
	 */
	setToken(user) {
		let userData = ({
			id: user.id,
			email: user.email,
			name: user.name,
			profile: user.profile
		})
		let token = jwt.sign(userData, process.env.SECRET_KEY, {
			expiresIn: '40 days'
		})
		return token;
	}
}