const Product=require("./sqlConnection");

    
const deleteProduct=async (id,callback)=>{
        try{

            await Product.getClient().query(`update products set isavailable=false where product_id='${id}'`);
            callback(null,"scucess")
        }catch(err){
            console.log(err)
            callback(err,null)

        }
    }
    
module.exports=deleteProduct;
