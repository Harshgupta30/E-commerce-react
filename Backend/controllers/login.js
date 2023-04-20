const SetandGetData =require("../services/servicesSql/SetandGetData.js");
const Products=require("../services/servicesSql/Getproduct");
const jwt = require('jsonwebtoken');

let product=[],newpro=[],cartitems={};

const Users=require("../services/servicesSql/sqlConnection");

// Users.connectDb();


const login=(req,res)=>{
    let {username,password} = req.body;
    const token = jwt.sign({ userId: username }, 'secret-key');
    let d=[];
    
    if(username=="admin" && password=="123"){
        req.session.islog=true;
        let temp={name:"Admin",username:"admin",email:"admin@gmail.com",password:"123",
            "varified":true,
            "token":Date.now()
        };
        req.session.user=temp;
        res.render("admin",{user:req.session.user,error:"",product:product});
         return; 
    }
    SetandGetData(null,(err, data)=>{
        // console.log(data)
        if(err){
            res.status(500).json("something went wrong");
            return;
        }
        if(data.length>0){
            d=data;
        }
     
        let flag=0,seller=false;
        for(let i=0;i<d.length;i++){
              if(d[i].username==username && d[i].password==password){
                req.session.islog=true;
                req.session.user=d[i];
                flag=1;
                if(d[i].isseller==true){
                    seller=true;
                }
            }
        }
        
        if(flag==0){
            res.status(500).json("Username or password is wrong")
            return;
        }
        else{
            if(seller){
                res.status(200).json({user:"Seller",token})
                return; 

            }else{
                res.status(200).json({user:"User",token})
                return; 
            }
        }
        
    })
}

module.exports=login;