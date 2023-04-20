import Navbar from '../../components/Navbar/sellernavbar';
import Footer from '../../components/footer/footer'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './seller.css';


export default function seller({user,logout}) {

    const [items,setItems]=useState([]);
    const [check,setCheck]=useState(true)
    const [success,setSucess]=useState(false)
    
    const [index,setIndex]=useState(-1);

    const [add,setAdd]=useState(false)
    const [details,setDetails]=useState({
      name:"",
      price:"",
      description:"",
      quantity:"",
      product_id:""
    });
    function addvalue(e){
      const val=e.target.value;
      const name=e.target.name;
  
      setDetails((prev)=>{
        return{
          ...prev,
          [name]:val
        }
      })
     
    }
   


    useEffect(()=>{
        getData()
    },[])

   async function getData(){
        try{
            const res=await axios.post('http://localhost:3000/sellerProducts',{user})
            setCheck(false)
            setItems(res.data)
          }
          catch(err){
            setCheck(false)

            console.log(err);
          }
    }
    const updateProduct=(i) => {
      setIndex(i)
      setSucess(false)
      setAdd(true)
      setDetails({
        name:items[i].name,
        price:items[i].price,
        description:items[i].description,
        product_id:items[i].product_id,
        quantity:items[i].quantity
      })
    }
    const deleteFunc=async (id)=>{
     
      try{
        const res=await axios.post('http://localhost:3000/deleteProduct',{id:id})
          setItems(items.filter((item)=>{
            return item.product_id!=id;
          }))
      }
      catch(err){
        console.log(err);
      }
    }
   async function sendUpdateProduct(id){
      try{
        const res=await axios.post('http://localhost:3000/updateProduct',details)
          console.log("updated")
          if(index!=-1){
            items[index].name=details.name;
            items[index].description=details.description;
            items[index].price=details.price;
            items[index].quantity=details.quantity;
            items[index].product_id=details.product_id;
            setItems([...items])
            setAdd(false)
            setSucess(true)
          }
         
      }
      catch(err){
        console.log(err);
      }
    
   }
  return (
    <>
    <Navbar logout={logout}  />
    {success? <div className="d-flex mt-4 justify-content-center align-items-center"><h4 style={{color:"lightgreen", fontStyle:"italic"}}>SuccessFully Updated</h4></div>:add?
    <>

      <div  className='d-flex flex-column justify-content-center align-items-center mt-4 '>
        <div className="row adminform">
            <div className="col-6">
                <input type="text" value={details.name} className="round" name="name" onChange={addvalue} /><br />
                <input type="text" value={details.price} className="round" name="price" onChange={addvalue} /><br />
                <input type="text" value={details.description} className="round" name="description" onChange={addvalue} />
                <input type="text" value={details.quantity} className="round" name="quantity" onChange={addvalue} />

            </div>
            <div className="col-6">
                 <label className="form-label" htmlFor="form1Example1">Product Name</label><br />
                 <label className="form-label" htmlFor="form1Example1">Product Price</label><br />
                 <label className="form-label" htmlFor="form1Example1">Product Decription</label>
            </div>
            <div className="row " >
               <button type="submit" className="btn btn-primary btn-block add" onClick={()=>sendUpdateProduct(details.product_id)}>Update Product</button>
            </div>
        </div>
       
      </div>
      <hr />
    </>
    
    :null}
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 ml-2 mt-4 p-4 w-100 d-flex justify-content-center">
    {check?
      <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}><h1>Loading...</h1></div>
    :items.length==0 ? <div className='d-flex justify-content-center'><h2>No items yet</h2></div>:
      items.map((val,i) => (
              <div className="col" key={val.product_id}>
              <div className="card">
                <img
                  src={val.product_id}
                  className="card-img-top imgcss"
                />
                <div className="card-body">
                  <div  className='d-flex justify-content-between md-2'>
                    <h5 className="card-title">{val.name}</h5>
                    <h6>Price : {val.price}</h6>
                  </div>
                  <p className="card-text">
                    {val.description}
                  </p>
                  <p className="card-text">
                    Quantity:{val.quantity}
                  </p>
                 <div className='d-flex justify-content-between align-items-center sellerbtn '>
                  <div>
                  <button className='btn btn-secondary' onClick={()=>updateProduct(i)} >Update</button> 
                  </div>
                  <div>
                  <button className='btn btn-danger'  onClick={()=>deleteFunc(val.product_id)}>Delete</button>
                  </div>

                 </div>
              
                </div>
              </div>
            </div>
          ))}
          </div>
          <Footer />
    </>
  )
}


function Addproduct(){
  

  return(
    <>
     
    </>
  )
}