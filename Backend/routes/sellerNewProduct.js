const express=require("express");
const pro=require("../controllers/sellerNewProduct");
const getnewproduct=pro.get;
const postnewproduct=pro.post;
const router=express.Router();


router.get("/",getnewproduct)
router.post("/",postnewproduct);


module.exports=router;