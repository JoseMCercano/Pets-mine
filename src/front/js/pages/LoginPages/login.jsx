import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Login = () => {
    const { actions } = useContext(Context);
    let navigate = useNavigate();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    const SignupSchema = Yup.object().shape({
      email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email required"),
      password: Yup.string("Enter your password")
        .min(2, "Password should be of minimum 8 characters length")
        .max(50, "Too Long!")
        .required("Password required"),
    });

  return (
    <div className="pagesBackground">
      <div
        // className="destinationsBackground"
        // style={{
        //   backgroundImage: `url(${destinationBackground})`,
        // }}
      >
        <Formik
          //initial values
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          // declare onSubmit and get the login values
          onSubmit={async (values) => {
            // then save it in the variable to take the answer of the flux variable
            let onLogged = await actions.login(values.email, values.password);
            // condition depending of flux answer
            if (onLogged === "User doesn't exist") {
              navigate("/signup");
            } else if (onLogged.msg === "Bad email or password") {
              navigate("/login");
            } else {
              navigate("/");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div col="12">
                    <div
                      className="bg-ligth  my-5 mx-auto"
                      style={{ maxWidth: "600px"}}
                    >
                      <div className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                        <h2
                          className="fw-bold mb-2 text-uppercase"
                          style={{ color: "#d2ae6d" }}
                        >
                          Login
                        </h2>
                        <p className="overview-title mt-3 mb-3" style={{color:"#d2ae6d"}}>
                          Please enter your login and password
                        </p>
                        <div className="error col-12 ">
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="form-controlP"
                          />
                          {errors.email && touched.email && errors.email}
                          <label
                            className="form-label"
                            
                          ></label>
                        </div>
                        <div className="error col-12 ">
                          <Field
                            name="password"
                            type="password"
                            className="form-controlP"
                            placeholder="Password"
                          />
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </div>
                        <p className="small mb-3 pb-lg-2">
                          <br />
                          <Link
                            className="overview-title"
                            to={"/ChangePassword"}
                          >
                            Forgot password?
                          </Link>
                        </p>
                        <button
                          type="submit"
                          // disabled={isSubmitting}
                          className="btn btn-cream btn-lg mx-2 px-5"
                          
                          
                        >
                          Login
                        </button>
                        <div className="d-flex flex-row mt-3 mb-5"></div>
                        <div>
                          <p className="mb-0 overview-title" style={{ color: "#d2ae6d" }}>
                            Don't have an account?{" "}
                            <Link
                              to="/signup"
                              className="text-black-50 fw-bold"
                            >
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>

{/*---------------------------------------------------- footer for spacing--------------------------------------------------- */}

        <footer className="footerDestinations"> </footer>
      </div>
    </div>
  )
}

export default Login;