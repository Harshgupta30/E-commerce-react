const express=require("express");
const checkAuth=require("../middlewares/checkauth");
const home=require("../controllers/home");
const router=express.Router();

router.post("/",checkAuth,home);


module.exports=router;