const updateUser=require("../services/servicesSql/updateUser");

const getChangePass=(req,res)=>{
    if(req.session.islog && req.session.user.varified){
        res.render("changePass",{error:"",success:""});
       
        return;
    }
    else{
        res.redirect("/home");
    }
}

const postChangePass=(req,res)=>{
    let {values,user}=req.body;
    updateUser(user,values.password)
    res.status(200).json("sucess")

}

module.exports={getChangePass,postChangePass}