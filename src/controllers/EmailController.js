var nodemailer = require('nodemailer')
module.exports = class EmailController {
	constructor(req, res){
		this.req = req
		this.res = res
	}

	async sendEmail(token, user) {
		const transporter = this.createTransport()

		var url = `http://localhost:4000/new-password.html?token=${token}&id=${user.id}`
		const mailOptions = {
			from: 'SENAI 5S <suportesenai5s@gmail.com>',
			to: user.email, 
			subject: 'Recuperação de Senha', 
			html: `<p>Olá,</p>
                  </br>
                  <p>Você solicitou a alteração de sua senha recentemente. Para alterar a senha, basta acessar o link: </p>
                  </br>
                  ${url}`
		}

		var response = true
		await transporter.sendMail(mailOptions).then((data, err) => {
			if(err)
				response = false
		})
		return response
	}

	async sendEmailSuccessfulEvaluation(email) {
		const transporter = this.createTransport()
		const mailOptions = {
			from: 'SENAI 5S <suportesenai5s@gmail.com>',
			to: email,
			subject: 'Avaliação finalizada com sucesso', 
			html: `<p>Olá,</p>
                  </br>
                  <p>Parabéns! O ambiente no qual você é responsável foi avaliado na auditoria 5S e não foram encontradas inconformidades!</p>
                  </br>`
		}

		var response = true
		await transporter.sendMail(mailOptions).then((data, err) => {
			if(err)
				response = false
		})
		return response
	}

	async sendEmailWithNonCompliances(obj) {

		var nonComplianceItems = '<ul>'
		obj.evaluationDto.nonCompliances.forEach(nonCompliance => {
			nonComplianceItems += `<li> Nome da não conformidade: ${nonCompliance.questionTitle} &zwnj;</li>`
			nonComplianceItems += `<li> Comentário: ${nonCompliance.comments} &zwnj;</li>`
		})
		nonComplianceItems += '</ul>'
		const transporter = this.createTransport()

		const mailOptions = {
			from: 'SENAI 5S <suportesenai5s@gmail.com>',
			to: obj.evaluationDto.email,
			subject: 'Avaliação finalizada com não conformidades encontradas', 
			html: `<p>Olá,</p>
                  </br>
                  <p>O ambiente no qual você é responsável foi avaliado na auditoria 5S foram encontradas algumas não conformidades:</p>
                  </br>
                  ${nonComplianceItems}
                  </br>` 

		}

		var response = true
		await transporter.sendMail(mailOptions).then((data, err) => {
			if(err)
				response = false
		})
		return response
	}

	//TODO: mudar aqui vem o ambiente e aqui vem a duedate por variaveis reais
	async sendEmailSchedulingEvaluation() {
		const transporter = this.createTransport()
		const mailOptions = {
			from: 'SENAI 5S <suportesenai5s@gmail.com>',
			to: 'nassguilherme@gmail.com',
			subject: 'Avaliação agendada com sucesso', 
			html: `<p>Olá,</p>
                  </br>
                  <p>Você foi selecionado para avaliar o ambiente AQUI VEM O AMBIENTE com o prazo de término até AQUI VEM A DUEDATA </p></br>
                  <p>Acesse seu aplicativo e avalie o ambiente pendente até o prazo determinado.
                  </br>`
		}

		var response = true
		await transporter.sendMail(mailOptions).then((data, err) => {
			if(err)
				response = false
		})
		return response
        
	}

	createTransport() {
		return nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'suportesenai5s@gmail.com',
				pass: 'senai5s2018'
			}
		})
	}
}
