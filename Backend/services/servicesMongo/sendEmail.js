const nodemailer = require('nodemailer');


const sendEmail= async (email,token,callback)=>{
    let testAccount =await nodemailer.createTestAccount();

    const transporter = await nodemailer.createTransport({
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
        subject: "Email verification", // Subject line
        html: `<h1>Please verify mail</h1> <a href="http://localhost:5173/verifyMail/?id=${token}"> Click here</a>`, // html body
      });
      console.log(info);
      callback(null,info);
}
module.exports=sendEmail;