const Users=require("./sqlConnection");
    
const tokenVerify=async (token,callback)=>{
        try{

            await Users.getClient().query(`update users set Varified=true where token='${token}'`);
            const res=await Users.getClient().query(`select username from users where token='${token}'`);
            callback(null,res.rows)
            
        }catch(err){
            callback(err,null);
            console.log(err)
        }
    }
    
module.exports=tokenVerify;


