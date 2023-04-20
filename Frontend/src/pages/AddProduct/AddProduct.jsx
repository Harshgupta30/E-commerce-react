import React, { useState,useRef } from 'react';
import Navbar from '../../components/Navbar/sellernavbar';
import './AddProduct.css'
import app from './firebase'
import axios from 'axios'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddProduct({logout,user}) {
    const [err,setErr]=useState('')
    const [Suc,setSuc]=useState('')

    const [details,setDetails]=useState({
      name:"",
      price:"",
      description:"",
      quantity:"",
      product_id:""
    });
    const inputRef = useRef(null); 



    function addvalue(e){
      const val=e.target.value;
      const name=e.target.name;

        if(name=="img"){
          setDetails((prev)=>{
            return {
              name:prev.name,
              price:prev.price,
              description:prev.description,
              quantity:prev.quantity,
              product_id:e.target.files[0],
            }
          })
        }
        else {

          setDetails((prev)=>{
            return{
              ...prev,
              [name]:val
            }
          })
        }
    
     
    }

   
    function add(e){
      e.preventDefault();

      const fileName = new Date().getTime() + details.product_id.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage , fileName);
      const uploadTask = uploadBytesResumable(StorageRef, details.product_id);

      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            setSuc('Image Upload is paused')
            break;
          case 'running':
            console.log('Upload is running');
            setSuc('Image Upload is running')
            break;
        }
      }, 
      (error) => {
        setErr("Couldn't upload file");
        
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
          try{
            const res=await axios.post('http://localhost:3000/sellerNewProduct',{details,user,downloadURL})

            setSuc("Product Uploaded Successfully");
            setDetails({
              name:"",
              price:"",
              description:"",
              quantity:"",
              product_id:""
            });
            inputRef.current.value = null;
    
          }
          catch(error){
            console.log(error)
            setErr("Error from server");

          }
          })
        });

    }

    
  return (
    <>
    <Navbar logout={logout} />
    <div  className='d-flex flex-column justify-content-center align-items-center mt-4 '>

    <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={add} >
        <div className="row adminform">
            <div className="col-6">
                <input type="text" value={details.name} className="round" name="name" onChange={addvalue} required/><br />
                <input type="text" value={details.price} className="round" name="price" onChange={addvalue} required/><br />
                <input type="text" value={details.quantity} className="round" name="quantity" onChange={addvalue} required/><br />
                <input type="text" value={details.description} className="round" name="description" onChange={addvalue} required/>
                <input type="file" ref={inputRef} accept="image/*" name="img" onChange={addvalue} required/>
            </div>
            <div className="col-6">
                 <label className="form-label" htmlFor="form1Example1">Product Name</label><br />
                 <label className="form-label" htmlFor="form1Example1">Product Price</label><br />
                 <label className="form-label" htmlFor="form1Example1">Product Quantity</label>
                 <label className="form-label" htmlFor="form1Example1">Product Description</label>

            </div>
            <div className="row " >
               <button type="submit" className="btn btn-primary btn-block add" >Add Product</button>
            </div>
        </div>
       
    </form>
      </div>
      <hr />
    {Suc?
      <div className="d-flex justify-content-center"><h4 style={{fontStyle:"italic",color:"lightgreen"}}>{Suc}</h4></div>
    :<div className="d-flex justify-content-center"><h4 style={{fontStyle:"italic",color:"red"}}>{err}</h4></div>}
    </>
  );
}

export default AddProduct;