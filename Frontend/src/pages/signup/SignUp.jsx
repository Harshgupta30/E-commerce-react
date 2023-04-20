import React from "react";
import "./signup.css";

import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { signUpSchema } from "./schemas";
import { useState } from "react";

const SignUp = () => {
  const [er, seter] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    user: "user",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        try {
          const res = await axios.post('http://localhost:3000/signup', values)
          seter('');
          console.log(res.data)
          navigate("/temp")
        } catch (e) {
          console.log(e.response)
          seter(e.response.data)
        }
        action.resetForm();
      },
    });

  return (
    <>
      <div className="container-fluid bg">
        <div className="row">
          <div className="col signup-form">
            <form onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <p>Please fill in this form to create an account!</p>
              {er ? (
                <p className="form-error">{er}</p>
              ) : null}
              <div className="form-group">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>
              <div className="form-group">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.username && touched.username ? (
                  <p className="form-error">{errors.username}</p>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
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
                  type="password"
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
              <div className="form-group d-flex justify-content-around" >
                <div>
                  <p style={{ fontWeight: "600" }}>Type of User</p>
                </div>
                <div>
                  <label htmlFor="picked"> Customer</label>
                  <input type="radio" name="user" value="user" onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="picked"> Seller</label>
                  <input type="radio" name="user" value="seller" onChange={handleChange} />

                </div>

              </div>
              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
              </div>
              <div>
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
          <div className="col right">
            {/* <img src="img.jpg" alt="" /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
