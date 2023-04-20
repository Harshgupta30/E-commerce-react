const Cart=require("../services/servicesSql/getCart");
const updateCart=require("../services/servicesSql/updateCart");

const addtocart=(req,res)=>{

    let id=req.body.itemId;
    let username=req.body.user;
    if(username){
        Cart(null,username,(err,data)=>{
            if(data && data.length>0){
                let flag=0;
                let updated;
                for(let i=0;i<data.length;i++) {
                    if(data[i].product_id==id){
                        data[i].quantity++;
                        updated=data[i];
                        flag=1;
                        break;
                    }
                }
                if(flag==1){
                    updateCart(updated,flag,username,id);
                }
                else{
                    updated={
                        username:username,
                        product_id:id,
                        quantity:1
                    }
                    updateCart(updated,flag,username,id);
                }
                return res.status(200).json("sucess")
                
            }else{
                const item={};
                item.username = username;
                item.product_id=id;
                item.quantity=1;
                Cart(item,username,(err,data)=>{
                 return res.status(200).json("sucess")

                });

            }
        
        })
    }
    else{
        res.status(500).json("username not found")
    }
}

module.exports=addtocart;