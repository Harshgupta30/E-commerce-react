const Cart=require("../services/servicesSql/getCart");
const Products=require("../services/servicesSql/Getproduct");


module.exports=(req,res)=>{
    Products(null,(err,d)=>{
        if(err){
            return res.status(500).json("Something went wrong");

         }
        Cart(null,req.userId,(err,data)=>{
            // console.log(data);
            if(err){
               return res.status(500).json("Something went wrong");

            }
            return res.status(200).json({cart:data,products:d});
        
        })  
    })
}