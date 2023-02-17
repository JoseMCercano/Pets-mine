import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";


const ServicesDetails = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getServiceDetail(params.id);
    
   
  }, [params.id]);

  return (

    <div className="parent">
    <div className="column column1">Column 1</div>
    <div className="column column2">Column 2</div>
    <div className="column column3">Column 3</div>
    <h3 className="package-detail-title mt-5">
                  {store.serviceDetail.name}
                </h3>
</div>

    

  )
}

export default ServicesDetails;