const express=require("express");
const getAndSetOrder=require("../services/servicesSql/getAndSetOrder");
const Products=require("../services/servicesSql/Getproduct");


const router=express.Router();
let ar=[];

router.post("/",(req,res) => {
    let username=req.body.user;
    getAndSetOrder(null, username,ar,(err, item) => {
        let order=[];
        Products(null,(err,val)=>{
            item.forEach(element => {
                val.forEach(e => {
                    if(element.product_id === e.product_id){
                        let temp={
                            product_id:e.product_id,
                            name:e.name,
                            description:e.description,
                            quantity:element.quantity,
                            price:e.price,
                            order_id:element.order_id,
                        }
                        order.push(temp);
                    }
                });
            });  
            return res.status(200).json(order)

           
        })
        
    })
    
});
module.exports=router;