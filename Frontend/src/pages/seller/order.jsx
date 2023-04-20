import React, { useState,useEffect } from 'react';

import Navbar from '../../components/Navbar/sellernavbar';
import axios from 'axios'

function order({logout,user}) {
    const [items,setItems] =useState([]);
    const [check,setCheck]=useState(true)

    
    useEffect(()=>{
        getOrder();
    },[])
    async function getOrder() {
        try{
            let res=await axios.post('http://localhost:3000/seller/ordersList',{user:user})
            console.log(res.data)
            setItems(res.data)
            setCheck(false)
        }catch(e){
            console.log(e)
            setCheck(false)
        }
        
    }
    async function deleteItem(index){
        let val={
            id: index,
            user:user
        }
        try{
            let res=await axios.post('http://localhost:3000/seller/deleteBySeller',val)
            setItems(items.filter((item,i)=>{
                return item.order_id!=index;
            }))
        }catch(e){
            console.log(e)
        }
         
    }
    
    return (
        <>
        <Navbar logout={logout} />
            <section className="h-100" style={{backgroundColor: "#eee"}}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-normal mb-0 text-black">Ordered Items</h3>
                        </div>
                        {check ? <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}><h1>Please Wait...</h1></div> :
                        items.length==0? 
                            <div className="d-flex justify-content-center"><h4 style={{fontStyle:"italic"}}>No items are Ordered yet</h4></div>
                        :
                        items.map((val,index)=>{
                            return(
                        <div className="cards rounded-3 mb-4" key={val.order_id}>
                          <div className="card-body p-4">
                            <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                src={val.product_id}
                                className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-3">
                                <p className="lead fw-normal mb-2">{val.name}</p>
                                <p><span className="text-muted">{val.description}</span></p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2">  
                                <span>Quantity: {val.quantity}</span>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2">  
                            Ordered By:<span> {val.user}</span>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1">
                                <h5 className="mb-0">{val.price}</h5>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 text-end">
                                <span  className="text-danger" onClick={(e)=>deleteItem(val.order_id)}><i className="fas fa-trash fa-lg"></i></span>
                            </div>
                            </div>
                        </div>
                        </div>  
                            )

                        })}
                        

                    </div>
                    </div>
                </div>
            </section>
        </>
         
    );
}

export default order;