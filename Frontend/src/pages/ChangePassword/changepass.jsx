import React from 'react';

import { signUpSchema } from "./schemas";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function changepass({user}) {
    const [er,seter]=useState('');
    const [show,setShow]=useState(false);
    
    const [Suc,setSuc]=useState('');

    const navigate  = useNavigate();
    const initialValues = {
        password: "",
        confirm_password: "",
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post('http://localhost:3000/changePass', {values,user})
          setSuc('Password Changed SuccessFully');
          setTimeout(()=>{
            navigate("/");
          },2000)
        } catch (e) {
          console.log(e.response)
          seter(e.response.data)
        }
        action.resetForm();
      },
    });

    function showPass(e){
        if(e.target.checked)
            setShow(true)
        else
            setShow(false)
    }
    return (
        <>
            <div className="container-fluid bg">
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                <h2>Change Your Password</h2>
                <p>Please fill in this form to Change your password!</p>
                {er?(
                    <p className="form-error">{er}</p>
                ) : null}
               {Suc? <p style={{color:"lightgreen"}}>{Suc}</p>:
                null}
                <div className="form-group">
                    <input
                    type={show?"text":"password"}
                    className="form-control"
                    name="password"
                    placeholder="New Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                    type={show?"text":"password"}
                    className="form-control"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    <p></p>
                    {errors.confirm_password && touched.confirm_password ? (
                    <p className="form-error">{errors.confirm_password}</p>
                    ) : null}
                </div>
                <div className="form-group d-flex">
                    <input type="checkbox" name="showpass" onClick={showPass} style={{marginRight:"5px",marginTop:"0px"}}/><h6 >Show Password</h6>
                </div>
                <div className="form-group ">
                    <button type="submit" className="btn btn-primary btn-lg">
                    Change Pass </button>
                </div>
            </form>
            </div>
            </div>
        </>
    );
}

export default changepass;