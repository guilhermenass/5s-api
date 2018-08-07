var nodemailer = require('nodemailer');

module.exports = class EmailController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    async sendEmail(token, user) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'suportesenai5s@gmail.com',
                pass: 'projetoconsolidado'
            }
        })

        var url = `http://localhost:8080/new-password.html?token=${token}&id=${user.id}`;
        const mailOptions = {
            from: 'SENAI 5S <suportesenai5s@gmail.com>',
            to: user.email, 
            subject: 'Recuperação de Senha', 
            html: `<p>Olá,</p>
                  </br>
                  <p>Você solicitou a alteração de sua senha recentemente. Para alterar a senha, basta acessar o link: </p>
                  </br>
                  ${url}`
        };

        var response = true;
        await transporter.sendMail(mailOptions).then((data, err) => {
            if(err)
                response = false;
        })
        return response;
    };
}