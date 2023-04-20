const Product=require("./sqlConnection");

    
const updatProduct=async (p,callback)=>{
        try{
            await Product.getClient().query(`update products set name='${p.name}',description='${p.description}',price='${p.price}',quantity='${p.quantity}' where product_id='${p.product_id}'`);
            
            callback(null,"suce")
        }catch(err){
            console.log(err)
            callback(err,null);
        }
    }
    
module.exports=updatProduct;
