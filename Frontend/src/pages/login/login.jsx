import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";


const Login = ({ setLogin }) => {
  const [er, seter] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,

      onSubmit: async (values, action) => {
        try {
          const res = await axios.post('http://localhost:3000/login', values)
          seter('');
          let t = res.data.token;
          let u = values.username
          if (res.data.user == "Seller") {
            localStorage.setItem('token', JSON.stringify({ token: t, username: u, seller: true }));
          }
          else {
            localStorage.setItem('token', JSON.stringify({ token: t, username: u, seller: false }));

          }
          setLogin();

        } catch (e) {
          console.log(e)
          if (e.code == 'ERR_NETWORK') {
            seter("Server Unavailable")
          }
          else {
            seter(e.response.data)
          }
        }
        action.resetForm();
      },
    });

  return (
    <>
      <div className="container left">
        <div className="row d-flex justify-content-center row-cols-md-2">
          <div className="col signup-form">
            <form onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <p>Please fill in this form to login into your account!</p>
              {/* <hr /> */}
              {er ? (
                <p className="form-error">{er}</p>
              ) : null}

              <div className="form-group">
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.username && touched.username ? (
                  <p className="form-error">{errors.username}</p>
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
                  required
                />
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </div>

              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign In
                </button>
              </div>
              <div>
                Not a user? <Link to="/signup">Signup</Link>
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
export default Login;
