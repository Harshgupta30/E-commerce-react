import React, { useEffect, useState } from 'react';
import './cart.css';
import Navbar from '../../components/Navbar/navbar'
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";

function cart({logout,user}) {
    const [quantity,setQuantity] =useState(0);
    const [items,setItems] =useState([]);
    const [check,setCheck]=useState(true)



    useEffect(()=>{
        getCart();
       
    },[])
    async function getCart() {
        try{
            let res=await axios.post('http://localhost:3000/getCart',{user:user})
            setItems(res.data)
            setCheck(false)
        }catch(e){
            console.log(e)
            setCheck(false)

        }
        
    }
  
    
    async function handlePlus(index){
        let value={
            id:items[index].product_id,
             user:user,
             quantity:items[index].quantity+1
            }
        try{
            const res=await axios.post('http://localhost:3000/plus',value)
            if (res.status==200) {
                items[index].quantity++;
                 setItems([...items]);
           }
          }catch(er){
            console.log(er)
            alert("Cannot go above maximum stock")
          }
        
    }
   async function handleMinus(index){
        if(items[index].quantity>1){
            let value={id:items[index].product_id,
            user:user,
            quantity:items[index].quantity-1}
            console.log(value)
                try{
                    const res=await axios.post('http://localhost:3000/minus',value)
                    if (res.status==200) {
                        items[index].quantity--;
                       setItems([...items]);
                   }
                  }catch(er){
                    console.log(er)
                  }
            
        }
    }
    async function deleteItem(index){
        let value={itemId:items[index].product_id,
            user:user,}
        try{
            const res=await axios.post('http://localhost:3000/removecart',value)
            if (res.status==200) {
                setItems(items.filter((item,i)=>{
                    return i!=index;
                }))
            }
          }
          catch(err){
            console.log(err);
          }
        
    }
    const checkout=async ()=>{
        let value={
            data:items,
            user:user
        }
        try{
            const res=await axios.post('http://localhost:3000/checkout',value)
            if (res.status==200) {
                const res = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                );
                let sum=0;
                items.map((v)=>{
                    const numberStr = v.price.split("$")[1];
                    sum+=parseInt(numberStr)*parseInt(v.quantity);
                })
                const result = await axios.post("http://localhost:3000/checkout/checkoutPayment",{sum});
                const { amount, id: order_id, currency } = result.data.order;
                
                const options = {
                    key: "rzp_test_VAv2jA9rlvknap", // Enter the Key ID generated from the Dashboard
                    amount: amount.toString(),
                    currency: currency,
                    name: "Ecommerce Corp.",
                    description: "Test Transaction",
                    "image": "https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg",
                    order_id: order_id,
                    handler: async function (response) {
                        const data = {
                            orderCreationId: order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };
        
                        const result = await axios.post("http://localhost:3000/checkout/payment", data);
        
                        items.map(async (val)=>{
                            let temp={
                                itemId:val.product_id,
                                user:user
                            }
                            try{
                                const res=await axios.post('http://localhost:3000/removecart',temp)
                              }
                              catch(err){
                                console.log(err);
                              }
                        })
                    setItems([]);

                    },
                    theme: {
                        color: "#61dafb",
                    },
                };
        
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                paymentObject.on('payment.failed', async function (response){
                    const result = await axios.post("http://localhost:3000/checkout/delete");
                    
                });

            }
          }
          catch(err){
            console.log(err);
          }
    }
    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
         document.body.appendChild(script);
       });
    };
    

    return (
        <>
        <Navbar logout={logout} />
            <section className="h-100" style={{backgroundColor: "white"}}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-normal mb-0 text-black">Cart</h3>
                        </div>
                        {check ? <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}><h1>Please Wait...</h1></div> :
                        items && items.length==0 ? 
                        <div className="d-flex justify-content-center"><h4 style={{fontStyle:"italic"}}><Nav.Link as={Link} to="/home">Order Now</Nav.Link></h4></div>:
                            items.map((val,index)=>{
                            return(
                                <div className="cards rounded-3 mb-4" key={val.product_id}>
                        <div className="card-body p-4">
                            <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                src={val.product_id}
                                className="img-fluid rounded-3 w-100 h-100" alt="Cotton T-shirt"/>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                                <p className="lead fw-normal mb-2">{val.name}</p>
                                <p><span className="text-muted">{val.description}</span></p>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button className="btn btn-link px-2" onClick={()=>handleMinus(index)}
                                >
                                <i className="fas fa-minus"></i>
                                </button>
                                
                                <input id="form1" name="quantity" value={val.quantity} type="number" onChange={(e)=>setQuantity(e.target.value)} 
                                className="form-control form-control-sm" />

                                <button className="btn btn-link px-2" onClick={()=>handlePlus(index)}
                                >
                                <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0">{val.price}</h5>
                            </div>
                           
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <span  className="text-danger" onClick={(e)=>deleteItem(index)}><i className="fas fa-trash fa-lg"></i></span>
                            </div>
                            </div>
                        </div>
                        </div>  
                            )

                        })
                        }
                        
                        

                       {items.length>0 
                       ?<div className="">
                        <div className=" d-flex justify-content-end">
                            <button type="button" onClick={checkout} className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                        </div>
                        </div>:""
                       }
                        

                    </div>
                    </div>
                </div>
            </section>
        </>
         
    );
}

export default cart;