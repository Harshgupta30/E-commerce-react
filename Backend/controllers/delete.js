const Carts=require("../services/servicesSql/sqlConnection");

module.exports=async (req,res)=>{
    if(req.session.user){ 
        let id=req.body.id;
        let username=req.session.user.username;
        await Carts.getClient().query(`delete from Cart where username='${username}' and product_id='${id}'`);
        res.redirect("/home");
        return;
    }
    else{
        res.redirect("/home")
    }
}