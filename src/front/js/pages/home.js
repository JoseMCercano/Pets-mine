import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col } from "react-bootstrap";


import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="pagesBackground">
      <div className="main-content1 container">
        <div className="margintop d-flex">
          <div className="col col-4">
            <img
              className="homelogo marginleftbig mb-5"
              src="{homelogo2}"
            ></img>
          </div>
          <div className="col  col-8 d-flex flex-column align-items-start justify-content-center">
            <h1 className="homehero mt-4">Car Wash</h1>
            <h2 className="mb-3">Home Service</h2>

            {/* BUTTONS */}
            <div className="d-flex align-items-center justify-content-between mb-5">
              <a
                className=" purplebutton mt-1 mb-5  w-50  text-center "
                onClick="{handleScroll}"
              >
                Login
              </a>
              <a
                className="ml-3 mt-1 mb-5 marginleft w-75 text-center signup"
                href="register-user"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        <h2 className="text-center mb-5 mt-5">Keep always you car like new with only 3 steps!</h2>
        {/* <div className="row m-2">
              <img className="mt-2 mb-3 p-1 col-xl-4 col-12" src="{store.packageDetail.url7}"></img>
              <img className="mt-2 mb-3 p-1 col-xl-4 col-12" src="{store.packageDetail.url8}"></img>
              <img className="mt-2 mb-3 p-1 col-xl-4 col-12" src="{store.packageDetail.url9}"></img>
            </div> */}

        <div className="steps row g-3">
          <div className="col mt-2 mb-3 p-2 col-xl-4 col-12">
            <div className="step1  ">
              <img className="imageicon" src="{icon1}"></img>
              <h4>1 Create an account or login</h4>
            </div>
          </div>

          <div className="col mt-2 mb-3 p-2 col-xl-4 col-12">
            <div className="step2">
              <img className="imageicon" src="{icon1}"></img>
              <h4 className="purple">2 Choose one of our services</h4>
            </div>
          </div>

          <div className="col mt-2 mb-3 p-2 col-xl-4 col-12">
            <div className="step3">
              <img className="imageicon" src="{icon1}"></img>
              <h4>3 Get your car clean</h4>
            </div>
          </div>
        </div>

       

        <div className="row justify-content-center mt-4 p-3">
          <Link to="/Services">
            <button type="button" className="btn btn-creamD col-12 ">
              START
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
