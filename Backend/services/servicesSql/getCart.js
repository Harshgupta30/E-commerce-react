const Carts=require("./sqlConnection");

async function getCart(cart,username,callback){
    try{
        // console.log("insdei")

        if(cart){
            await Carts.getClient().query(`insert into Cart(username,product_id,quantity) values('${cart.username}','${cart.product_id}','${cart.quantity}')`);
        }
        const res=await Carts.getClient().query(`Select * from Cart where username='${username}' order by cart_id`);
        callback(null,res.rows);

    }catch(err){
        callback(err,null);
         console.log(err)
    }
} 

module.exports=getCart;
