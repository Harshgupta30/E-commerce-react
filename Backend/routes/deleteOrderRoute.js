const express=require("express");
const dele=require("../controllers/delete");
const Orders=require("../services/servicesSql/sqlConnection");
const router=express.Router();


router.post("/",async (req,res)=>{
    let id=req.body.id;
    let user=req.body.user;
    console.log(user,id);
    
    await Orders.getClient().query(`delete from orders where user_id='${user}' and order_id='${id}'`);
    
    return res.status(200).json("sucess");
    
})

module.exports=router;