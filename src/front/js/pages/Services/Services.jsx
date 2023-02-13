import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

const Services = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getService(params.id);
  }, []);

  return (
    <div className="main-content pagesBackground" >Services
    <div>
        {store.service.map((item, index) => (
          <div key={item.id}>
            <div>
              {item.title == "normal" ? (
                <div>
                  {/* --this prints the post if the package id is even-- */}
                  {index % 2 == 0 ? (
                    <div className="container-fluid mt-3 packagesPost">
                      <div className="row mb-3 packagescards">
                        <div
                          className="col col-xl-5 picpackage ml-5"
                          style={{
                            
                            maxWidth: "888px",
                            backgroundImage: `url(${item.url})`,
                          }}
                        >
                          <div
                            className="row align-items-end"
                            style={{ height: "450px" }}
                          >
                            <div className="col text-on-imagePl ">
                              <h3 className="post_title">{item.name}</h3>
                              <p className="post_subtitle">{item.category}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-7"
                          style={{
                            backgroundImage: `url(${item.url1})`,
                          }}
                        >
                          <div className="row text-center pt-5">
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={tripdays}
                              ></img>
                              <p className="desticontitle">TOUR DURATION</p>
                              <p className="desticoncontent">
                                {item.tour_duration}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={destinationsicon}
                              ></img>
                              <p className="desticontitle">
                                DESTINATIONS INCLUDED
                              </p>
                              <p className="desticoncontent">
                                {item.destinations}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={activity}
                              ></img>
                              <p className="desticontitle">ACTIVITIES</p>
                              <p className="desticoncontent">
                                {item.activities}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={transport}
                              ></img>
                              <p className="desticontitle">TRANSPORT MODE</p>
                              <p className="desticoncontent">
                                {item.transport}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={lodging}
                              ></img>
                              <p className="desticontitle">LODGING</p>
                              <p className="desticoncontent">{item.lodging}</p>
                            </div>
                          </div>
                          <div className="row text-center justify-content-center">
                            <img
                              className="separator mb-5"
                              src={separator}
                              style={{ maxWidth: "150px", maxHeight: "150px" }}
                            ></img>
                          </div>
                          <div className="row text-center justify-content-center">
                            <p className="post_description mb-4">
                              {item.description}
                            </p>
                          </div>
                          <div className="row text-center justify-content-center">
                            {/* <Link to={"/PackagesDetails/" + item.id}>
                              <button className="btn btn-creamD justify mb-3">
                                Learn More
                              </button>
                            </Link> */}

<Link to={"/PackagesMap/" + item.id}>
                    <button className="btn btn-creamD justify mb-3">
                      LEARN MORE
                    </button>
                  </Link>

                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="container-fluid mt-3 packagesPost">
                      <div className="row mb-3 packagescards">
                        <div
                          className="col-xl-7"
                          style={{
                            backgroundImage: `url(${item.url1})`,
                          }}
                        >
                          <div className="row text-center pt-5">
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={tripdays}
                              ></img>
                              <p className="desticontitle">TOUR DURATION</p>
                              <p className="desticoncontent">
                                {item.tour_duration}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={destinationsicon}
                              ></img>
                              <p className="desticontitle">
                                DESTINATIONS INCLUDED
                              </p>
                              <p className="desticoncontent">
                                {item.destinations}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={activity}
                              ></img>
                              <p className="desticontitle">ACTIVITIES</p>
                              <p className="desticoncontent">
                                {item.activities}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={transport}
                              ></img>
                              <p className="desticontitle">TRANSPORT MODE</p>
                              <p className="desticoncontent">
                                {item.transport}
                              </p>
                            </div>
                            <div className="pb-0 col">
                              <img
                                className="iconsdestinations"
                                src={lodging}
                              ></img>
                              <p className="desticontitle">LODGING</p>
                              <p className="desticoncontent">{item.lodging}</p>
                            </div>
                          </div>
                          <div className="row text-center justify-content-center">
                            <img
                              className="separator mb-5"
                              src={separator}
                              style={{ maxWidth: "150px", maxHeight: "150px" }}
                            ></img>
                          </div>
                          <div className="row text-center justify-content-center">
                            <p className="post_description mb-4">
                              {item.description}
                            </p>
                          </div>
                          <div className="row text-center justify-content-center">
                            {/* <Link to={"/PackagesDetails/" + item.id}>
                              <button className="btn btn-creamD justify mb-3">
                                Learn More
                              </button>
                            </Link> */}

<Link to={"/PackagesMap/" + item.id}>
                    <button className="btn btn-creamD justify mb-3">
                      Learn More
                    </button>
                  </Link>

                          </div>
                        </div>

                        <div
                          className="col col-xl-5 picpackage ml-5"
                          style={{
                            
                            maxWidth: "888px",
                            backgroundImage: `url(${item.url})`,
                          }}
                        >
                          <div
                            className="row align-items-end justify-content-end "
                            style={{ height: "450px", color: "white" }}
                          >
                            <div className="col text-on-imagePr">
                              <h3 className="post2_title">{item.name}</h3>
                              
                              <p className="post2_subtitle">{item.category}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}{" "}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services;