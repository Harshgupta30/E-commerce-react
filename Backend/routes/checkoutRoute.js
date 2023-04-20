const express=require("express");
const getAndSetOrder=require("../services/servicesSql/getAndSetOrder");
const router=express.Router();
const Orders=require("../services/servicesSql/sqlConnection");
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_VAv2jA9rlvknap', key_secret: 'RFfnCXI3oCgzlG4swEoy5dGL' })

let arr=[];

router.post("/",(req,res)=>{
    let d=req.body.data;
    let user=req.body.user;
      
    for (let i = 0; i < d.length; i++) {
        getAndSetOrder(d[i],user,arr,(err, data) => {
            if(err){
                console.log(err);
                return;
            }
        })
    }
    return res.status(200).json("sucess")

    
});
router.post("/checkoutPayment",async (req,res)=>{
    let amount=req.body.sum;
    var options = {
        amount: amount*100, 
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
        if(err){
             return res.status(500).json("Eroor")
        }
        return res.status(201).json({order})
    });
     
})


router.post("/payment",async (req,res)=>{
    let paymentId=req.body.razorpayPaymentId;
    for (let i = 0; i < arr.length; i++) {
        await Orders.getClient().query(`update orders set payment_id='${paymentId}' where order_id='${arr[i]}'`);
    }
    arr=[];
    return res.status(200).json("success")
})

router.post("/delete",async (req,res)=>{
    for (let i = 0; i < arr.length; i++) {
        await Orders.getClient().query(`delete from orders where order_id='${arr[i]}'`);
    }  
    arr=[];
    return res.status(200).json("success")

})

module.exports=router;

