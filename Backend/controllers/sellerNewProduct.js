const seller=require("../services/servicesSql/getSeller");

let product=[],newpro=[],cartitems={};

const get=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.redirect("/seller")
        return;
     }
 
     res.redirect("/home")
}
const post=(req,res)=>{
    let product=req.body.details

    let pr={
        "name": product.name,
        "description": product.description,
        "price":product.price,
        "file":req.body.downloadURL,
        "seller":req.body.user,
        "quantity":product.quantity
    }
    
    seller(pr,req.body.user,(err,data)=>{
        if(err) {
            res.status(500).json("error");
            return;
        }
        res.status(200).json("success");

    })
   
}

module.exports={get:get,post:post};