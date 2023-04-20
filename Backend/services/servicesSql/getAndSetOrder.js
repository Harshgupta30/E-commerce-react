const Orders=require("./sqlConnection");

     
const getAndSetOrder=async (product,user,arr,callback)=>{
        try{ 
            if(product){
                await Orders.getClient().query('BEGIN');
        
                await Orders.getClient().query(`update products set quantity=quantity-'${product.quantity}' where product_id='${product.product_id}'`);
                
                let id=await Orders.getClient().query(`insert into orders(user_id,seller_id,product_id,quantity,address,city,pincode)
                values('${user}','${product.seller}','${product.product_id}','${product.quantity}','23 A/4k','alld',211016) RETURNING order_id`);

                arr.push(id.rows[0].order_id);

            }
            const res=await Orders.getClient().query(`Select * from orders where user_id='${user}'`);
            await Orders.getClient().query('COMMIT');
            callback(null,res.rows);
        }catch(err){
             await Orders.getClient().query('ROLLBACK');
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=getAndSetOrder;


