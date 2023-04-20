const express=require("express");
const sellerOrders=require("../services/servicesSql/sellerOrders");
const Orders=require("../services/servicesSql/sqlConnection");
const sendDeletemail=require("../services/servicesMongo/sendDeletemail.js");

const router=express.Router(); 

router.post("/ordersList",(req,res)=>{
    let user=req.body.user;
    let result=[];
    
    sellerOrders(user,(err,data,data1)=>{
        if(err){
            res.status(500).json("erro");
        }
        data.map((item)=>{
            data1.map((val,i)=>{
              if(val.product_id === item.product_id){
                  let temp={
                      product_id:val.product_id,
                      name:val.name,
                      description:val.description,
                      order_id:item.order_id,
                      quantity:item.quantity,
                      price:val.price,
                      user:item.user_id
                  }
                  result.push(temp);
              }
               
            })
        })
        res.status(200).json(result)
    })
    
})
router.post("/deleteBySeller",async (req,res)=>{
    let id=req.body.id;
    await Orders.getClient().query(`delete from orders where order_id='${id}'`,async (err,response)=>{
        if(err) res.status(500).json("err")
        
        res.status(200).json("sucess")
    });
        

    return;
})
module.exports=router;
