const Cart=require("../services/servicesSql/getCart");
const updateCart=require("../services/servicesSql/updateCart");
const checkStock=require("../services/servicesSql/checkStock");


module.exports=(req,res)=>{
    let id=req.body.id;
    let quantity=req.body.quantity;
    let user=req.body.user;
    checkStock(id,quantity,(err,data)=>{
        if(data=="good"){
            Cart(null,user,(err,data)=>{ 
                if(data.length>0){
                    let p={"quantity":quantity};
                    updateCart(p,1,user,id);
                }
                res.status(200).json("success");
            });
        }
        else{
            res.status(300).send(data);
        }
    })
    

}