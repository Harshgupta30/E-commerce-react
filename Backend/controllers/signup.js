const SetandGetData =require("../services/servicesSql/SetandGetData.js");
const sendMail=require("../services/servicesMongo/sendEmail.js");
const jwt = require('jsonwebtoken');


const getsign=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.redirect("/home");
        return;
    }
   
    res.render("signup",{error:""});
}

const postsign=(req,res)=>{
    let {name,username,email,password,user}=req.body;
    console.log(req.body);
    
    let d=[];

    SetandGetData(null,(err, data)=>{
        if(err){
            res.render("signup",{error:"something went wrong"});
            return;
        }
        if(data.length>0 ){
            d=data;
        } 
        for(let i=0;i<d.length;i++){
            if(d[i].username==username || d[i].email==email){
                res.status(500).json("User Already Registered")
                return;
            }
        }

        if(user=="seller"){
            user=true;
        }
        else{
            user=false;
        }
        const token = jwt.sign({ userId: username }, 'secret-key');
        let temp={name,username,email,password,user,
        "isVarified":false,
        "token":token
        };
        
        SetandGetData(temp,(err, data)=>{
            if(err) {
                res.status(500).json("something went wrong")
                return;
            }
            sendMail(temp.email,token,function(err,data){
                if(err) {
                    res.status(500).json("some error during sending email")
                    return;
                }
                req.session.islog=true;
                req.session.user=temp; 
                res.status(200).send("success");
            })
        //    res.status(200).send("success");

        })
        
    })
}

module.exports={getsign:getsign,postsign:postsign};