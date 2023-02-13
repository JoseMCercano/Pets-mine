import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="pagesBackground">
      <div className="main-content">
        <div className="experiencePagePicLinks container-fluid">
          {/* ----------------------------PAGE TITLE CAROUSEL TYPE 2------------------------------------------------- */}

          <Carousel slide={false}>
            <Carousel.Item>
              <img className="d-block w-100" alt="First slide" />
              <Carousel.Caption className="carousel2Caption">
                <h5 className="carousel2CaptionH5">SAFARI ADVENTURE</h5>
                <p className="carousel2CaptionP d-none d-md-block">
                  The Ultimate African Safari Experience.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" alt="Second slide" />

              <Carousel.Caption className="carousel2Caption">
                <h5 className="carousel2CaptionH5">SAFARI ADVENTURE</h5>
                <p className="carousel2CaptionP  d-none d-md-block">
                  Feel the nature like never before.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" alt="Third slide" />

              <Carousel.Caption className="carousel2Caption">
                <h5 className="carousel2CaptionH5">SAFARI ADVENTURE</h5>
                <p className="carousel2CaptionP  d-none d-md-block">
                  Enjoy the Safari with all confort.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="row justify-content-center mt-4 p-3">
          <Link to="/Services">
            <button type="button" className="btn btn-primary col-12 ">
              START
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
