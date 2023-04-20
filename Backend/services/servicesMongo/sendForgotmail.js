const nodemailer = require('nodemailer');


const sendForgotmail= async (email,callback)=>{
    let testAccount =await nodemailer.createTestAccount();

    const transporter =await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'leonard.hackett58@ethereal.email',
            pass: 'eXdwUrPeUfKnq6XWb4'
        }
    });

    let info =await transporter.sendMail({
        from: '"Ecommerce" <info@E-commerce.com>', // sender address
        to: email, // list of receivers
        subject: "Reset password", // Subject line
        html: `<h1>Click below to reset password</h1> <a href="http://localhost:3000/resetPass/${email}"> Click here</a>`, // html body
      });
      console.log(info);
      callback(null,info);
}
module.exports=sendForgotmail;