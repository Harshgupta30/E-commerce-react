const Users=require("./sqlConnection");

const updateUser=async (user,pass)=>{
        try{
            await Users.getClient().query(`update users set password='${pass}' where username='${user}'`);
        }catch(err){
            console.log(err)
        }
    }
    
module.exports=updateUser;


