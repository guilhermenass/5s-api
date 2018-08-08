var nodemailer = require('nodemailer');
console.log("#1");
module.exports = class EmailController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    async sendEmail(token, user) {
        console.log("#2", user, " " + token);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'suportesenai5s@gmail.com',
                pass: 'projetoconsolidado'
            }
        })
        console.log("#3");
        var url = `https://login-senai5s.herokuapp.com/new-password.html?token=${token}&id=${user.id}`;
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
