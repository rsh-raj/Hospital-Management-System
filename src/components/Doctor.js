import React, { useEffect, useState } from "react";
import StickyHeadTable from "./DoctorTable";
import "../styles/Admdb.css";
import CheckboxesGroup from "./DoctorFilter";
import axios from "axios";
import DoctorTodayApmts from "./DoctorAppointments";

const Doctor = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  let appointments = [];

  const [isTodayapmts, setIsTodayapmts] = useState(false);
  const [todaydata, setTodaydata] = React.useState(null);
  const [isUser, setIsuser] = useState(false);

  const handleTodayapmts = (e) => {
    setIsTodayapmts(true);
    e.preventDefault();
    var self_user_id = localStorage.getItem("self_user_id");
    axios
      .post('https://dbms-backend-api.azurewebsites.net/appointments?doc_id='.concat(`${self_user_id}`), {
        access_token: localStorage.getItem("access_token")
      })
      .then(
        (response) => {
          setTodaydata(response.data);
          console.log(response.data);
        }
        ,
        (error) => {
          console.log(error);
        }
      );

    if (todaydata) {
      appointments = todaydata;
    }
  };

  const handleBack = (e) => {
    setIsTodayapmts(false);
  };

  //   useEffect(() => {
  //       console.log("useEffect");
  //   }, [isTodayapmts]);

  let patients = [];

  const [post, setPost] = React.useState(null);

  useEffect(() => {
    let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "doc") { setIsuser(true); }
    var self_user_id = localStorage.getItem("self_user_id");
    axios
      .post('https://dbms-backend-api.azurewebsites.net/patient?doc_id='.concat(`${self_user_id}`), {
        access_token: localStorage.getItem("access_token")
      })
      .then(
        (response) => {
          setPost(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  if (post) {
    patients = post;
  }

  return (
    <div>
      {!isTodayapmts && isUser && (
        <>
          <div className="doctor_header">
            <input
              type="text"
              placeholder="Enter patient name"
              onChange={handleChange}
              value={searchInput}
              className="searchTerm"
            ></input>
            <button type="submit" className="searchButton">
              Go
            </button>
            <button className="aduser" onClick={handleTodayapmts}>
              Today's Appointments
            </button>
          </div>
          <div>
            <div className="dropdownAge">
              <CheckboxesGroup />
            </div>
            <div className="admind_table">
              <StickyHeadTable patients={patients} />
            </div>
          </div>
        </>
      )}
      {isTodayapmts && isUser && (
        <div className="admind_table">
          <button className="backButton" onClick={handleBack}>
            Back
          </button>
          <DoctorTodayApmts appointments={appointments} />
        </div>
      )}
      {
                !isUser && <div className='notAuthorized'> <div class="w3-display-middle">
                    <h1 class="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
                    {/* <h class="w3-border-white w3-animate-left" style="margin:auto;width:50%"> */}
                    <h3 class="w3-center w3-animate-right">You dont have permission to view this page.</h3>
                    <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
                    <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
                </div></div>
            }
    </div>
  );
};

export default Doctor;
