const nodemailer = require('nodemailer');


const sendDeletemail= async (email)=>{
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
        subject: "Seller Cancelled Your order", // Subject line
        html: `<h1>Seller has cancelled your order due to some reason. Please re-order or order from someone else.</h1><br>
        <h3>Thankyou. </h3>`, // html body
      });
      
}
module.exports=sendDeletemail;