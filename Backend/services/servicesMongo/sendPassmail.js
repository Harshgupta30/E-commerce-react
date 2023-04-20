const nodemailer = require('nodemailer');


const sendPassmail= async (email,callback)=>{
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
        subject: "Password Changed Succesfully", // Subject line
        html: `<h1>Dear user your password has been changed successfully</h1> `, // html body
      });
      console.log(info);
      callback(null,info);
}
module.exports=sendPassmail;