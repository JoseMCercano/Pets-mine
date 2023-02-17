import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	let navigate = useNavigate();
  
	// Calls flux logout
	const doLogout = () => {
	  //false
	  let onLogged = actions.logout();
  
	  if (!onLogged) {
		//true
		navigate("/login");
	  }
	};

	return (
		<nav className="navbar" style={{ backgroundColor: "#7565A8" }}>
        <div className="container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="navbar__logo mb-0 ">Car Wash</div>
          </Link>
          
          <div className="ml-auto">

            {!store.auth ? (
              <Link to="/login">
                <button className="btn btn-primary m-2">Login</button>
              </Link>
            ) : null}{" "}
            {store.auth ? (
              <Link to="/">
                <button
                  className="btn btn-primary m-2"
                  type="button"
                  onClick={doLogout}
                >
                  Log out
                </button>
              </Link>
            ) : null}
            {!store.auth ? (
              <Link to="/signup">
                <button className="btn btn-primary m-2">Sign Up</button>
              </Link>
            ) : null}{" "}
          </div>
        </div>
      </nav>
	);
};
