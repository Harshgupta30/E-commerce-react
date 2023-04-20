const Carts=require("../services/servicesSql/sqlConnection");

module.exports=async (req,res)=>{
    let id=req.body.itemId;
    let username=req.body.user;
    await Carts.getClient().query(`delete from Cart where username='${username}' and product_id='${id}'`);
    return res.status(200).json("sucess")
}