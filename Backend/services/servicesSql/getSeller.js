const Product=require("./sqlConnection");

    
const getSeller=async (product,seller,callback)=>{
        try{
           
            if(product){
                await Product.getClient().query(`insert into products values('${product.file}','${product.name}','${product.description}','${product.price}','${product.seller}','true','${product.quantity}')`);
            }
            const res=await Product.getClient().query(`Select * from products where seller='${seller}' and isavailable=true order by name`);
            callback(null,res.rows);
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=getSeller;


