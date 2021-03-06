import React, { useEffect, useState } from "react";
import validator from "validator";
import { db } from "../firebase";
import { countries } from "../countries.json";
function LeftPanel({
  setIsInListMode,
  isInListMode,
  openFeedback,
  setOpenFeedback,
}) {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [code, setcode] = useState("");
  const [dialcode, setdialcode] = useState("");
  const [countryresults, setcountryresults] = useState([]);
  const [showsuggestion, setshowsuggestion] = useState(false);
  const [stopautosearch, setstopautosearch] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  function searchCountry() {
    let results = [];
    countries.forEach((item) => {
      if (item.name.toUpperCase().indexOf(country.toUpperCase()) !== -1) {
        results.push(item);
      }
    });
    setcountryresults(results);
    setshowsuggestion(true);
  }
  useEffect(() => {
    if (!country || stopautosearch) {
      setstopautosearch(false);
      return;
    }
    searchCountry();
  }, [country]);
  useEffect(() => {
    console.log(dialcode + phone);
    if (validator.isMobilePhone(dialcode + phone, "any")) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  }, [phone]);
  useEffect(() => {
    if (validator.isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }, [email]);
  function handleSuggestionSelect(data) {
    setstopautosearch(true);
    setcountry(data.name);
    setcode(data.code);
    setdialcode(data.dial_code);
    setshowsuggestion(false);
  }
  async function handleSubmit() {
    if (!email || !firstname || !lastname || !address || !phone || !country) {
      alert("fill details first");
    } else {
      db.collection("submissions")
        .doc(email)
        .set({
          firstname,
          lastname,
          address,
          country,
          phone: dialcode + phone,
          email,
        })
        .then(() => {
          alert("Successfully submitted");
          setOpenFeedback(false);
        })
        .catch((err) => {
          if (err) console.log(err);
        });
    }
  }
  return (
    <div className={`leftPanelWrapper ${openFeedback ? "addBlur" : ""}`}>
      {openFeedback ? (
        <div
          className="background"
          onClick={() => setOpenFeedback(!openFeedback)}
        ></div>
      ) : null}
      <div className="leftPanelAndFeedback">
        <div className={`leftPanel `}>
          <div className="panelHead">
            <img
              src="https://images.unsplash.com/photo-1499540785729-ac6adfa4efbf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt=""
            />
            <div className="headTitleAndSubtitle">
              <h2>Hi Reader</h2>
              <h3>Here's your News!</h3>
            </div>
          </div>
          {!openFeedback ? (
            <div className="toggleWrapper">
              <h2>View Toggle</h2>
              <div className="toggleButtons">
                <div
                  className={`cardButton ${isInListMode ? "" : "activeButton"}`}
                  onClick={() => setIsInListMode(false)}
                >
                  <svg
                    width="45"
                    height="34"
                    viewBox="0 0 45 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.7812 2.83333C41.1542 2.83333 41.5119 2.98259 41.7756 3.24827C42.0393 3.51394 42.1875 3.87428 42.1875 4.25V29.75C42.1875 30.1257 42.0393 30.4861 41.7756 30.7517C41.5119 31.0174 41.1542 31.1667 40.7812 31.1667H4.21875C3.84579 31.1667 3.4881 31.0174 3.22438 30.7517C2.96066 30.4861 2.8125 30.1257 2.8125 29.75V4.25C2.8125 3.87428 2.96066 3.51394 3.22438 3.24827C3.4881 2.98259 3.84579 2.83333 4.21875 2.83333H40.7812ZM4.21875 0C3.09987 0 2.02681 0.447767 1.23564 1.2448C0.444474 2.04183 0 3.12283 0 4.25L0 29.75C0 30.8772 0.444474 31.9582 1.23564 32.7552C2.02681 33.5522 3.09987 34 4.21875 34H40.7812C41.9001 34 42.9732 33.5522 43.7644 32.7552C44.5555 31.9582 45 30.8772 45 29.75V4.25C45 3.12283 44.5555 2.04183 43.7644 1.2448C42.9732 0.447767 41.9001 0 40.7812 0H4.21875Z"
                      fill="#272727"
                    />
                    <path
                      d="M6.5625 18.7188C6.5625 18.2961 6.73041 17.8907 7.0293 17.5918C7.32818 17.2929 7.73356 17.125 8.15625 17.125H36.8438C37.2664 17.125 37.6718 17.2929 37.9707 17.5918C38.2696 17.8907 38.4375 18.2961 38.4375 18.7188C38.4375 19.1414 38.2696 19.5468 37.9707 19.8457C37.6718 20.1446 37.2664 20.3125 36.8438 20.3125H8.15625C7.73356 20.3125 7.32818 20.1446 7.0293 19.8457C6.73041 19.5468 6.5625 19.1414 6.5625 18.7188ZM6.5625 25.0938C6.5625 24.6711 6.73041 24.2657 7.0293 23.9668C7.32818 23.6679 7.73356 23.5 8.15625 23.5H27.2812C27.7039 23.5 28.1093 23.6679 28.4082 23.9668C28.7071 24.2657 28.875 24.6711 28.875 25.0938C28.875 25.5164 28.7071 25.9218 28.4082 26.2207C28.1093 26.5196 27.7039 26.6875 27.2812 26.6875H8.15625C7.73356 26.6875 7.32818 26.5196 7.0293 26.2207C6.73041 25.9218 6.5625 25.5164 6.5625 25.0938ZM6.5625 9.15625C6.5625 8.73356 6.73041 8.32818 7.0293 8.0293C7.32818 7.73041 7.73356 7.5625 8.15625 7.5625H36.8438C37.2664 7.5625 37.6718 7.73041 37.9707 8.0293C38.2696 8.32818 38.4375 8.73356 38.4375 9.15625V12.3438C38.4375 12.7664 38.2696 13.1718 37.9707 13.4707C37.6718 13.7696 37.2664 13.9375 36.8438 13.9375H8.15625C7.73356 13.9375 7.32818 13.7696 7.0293 13.4707C6.73041 13.1718 6.5625 12.7664 6.5625 12.3438V9.15625Z"
                      fill="#272727"
                    />
                  </svg>
                </div>
                <div
                  className={`listButton ${isInListMode ? "activeButton" : ""}`}
                  onClick={() => setIsInListMode(true)}
                >
                  <svg
                    width="49"
                    height="35"
                    viewBox="0 0 49 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14 31.5C14 31.0359 14.1844 30.5907 14.5126 30.2626C14.8408 29.9344 15.2859 29.75 15.75 29.75H47.25C47.7141 29.75 48.1592 29.9344 48.4874 30.2626C48.8156 30.5907 49 31.0359 49 31.5C49 31.9641 48.8156 32.4092 48.4874 32.7374C48.1592 33.0656 47.7141 33.25 47.25 33.25H15.75C15.2859 33.25 14.8408 33.0656 14.5126 32.7374C14.1844 32.4092 14 31.9641 14 31.5ZM14 17.5C14 17.0359 14.1844 16.5908 14.5126 16.2626C14.8408 15.9344 15.2859 15.75 15.75 15.75H47.25C47.7141 15.75 48.1592 15.9344 48.4874 16.2626C48.8156 16.5908 49 17.0359 49 17.5C49 17.9641 48.8156 18.4092 48.4874 18.7374C48.1592 19.0656 47.7141 19.25 47.25 19.25H15.75C15.2859 19.25 14.8408 19.0656 14.5126 18.7374C14.1844 18.4092 14 17.9641 14 17.5ZM14 3.5C14 3.03587 14.1844 2.59075 14.5126 2.26256C14.8408 1.93437 15.2859 1.75 15.75 1.75H47.25C47.7141 1.75 48.1592 1.93437 48.4874 2.26256C48.8156 2.59075 49 3.03587 49 3.5C49 3.96413 48.8156 4.40925 48.4874 4.73744C48.1592 5.06563 47.7141 5.25 47.25 5.25H15.75C15.2859 5.25 14.8408 5.06563 14.5126 4.73744C14.1844 4.40925 14 3.96413 14 3.5ZM3.5 7C4.42826 7 5.3185 6.63125 5.97487 5.97487C6.63125 5.3185 7 4.42826 7 3.5C7 2.57174 6.63125 1.6815 5.97487 1.02513C5.3185 0.368749 4.42826 0 3.5 0C2.57174 0 1.6815 0.368749 1.02513 1.02513C0.368749 1.6815 0 2.57174 0 3.5C0 4.42826 0.368749 5.3185 1.02513 5.97487C1.6815 6.63125 2.57174 7 3.5 7ZM3.5 21C4.42826 21 5.3185 20.6313 5.97487 19.9749C6.63125 19.3185 7 18.4283 7 17.5C7 16.5717 6.63125 15.6815 5.97487 15.0251C5.3185 14.3687 4.42826 14 3.5 14C2.57174 14 1.6815 14.3687 1.02513 15.0251C0.368749 15.6815 0 16.5717 0 17.5C0 18.4283 0.368749 19.3185 1.02513 19.9749C1.6815 20.6313 2.57174 21 3.5 21ZM3.5 35C4.42826 35 5.3185 34.6312 5.97487 33.9749C6.63125 33.3185 7 32.4283 7 31.5C7 30.5717 6.63125 29.6815 5.97487 29.0251C5.3185 28.3687 4.42826 28 3.5 28C2.57174 28 1.6815 28.3687 1.02513 29.0251C0.368749 29.6815 0 30.5717 0 31.5C0 32.4283 0.368749 33.3185 1.02513 33.9749C1.6815 34.6312 2.57174 35 3.5 35Z"
                      fill="#272727"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
          <div className="feedbackWrapper">
            <h2>Have a Feedback?</h2>
            <div
              className={`feedbackButton ${
                openFeedback ? "feedbackRedButton" : ""
              }`}
              onClick={() => setOpenFeedback(!openFeedback)}
            >
              We're Listening
            </div>
          </div>
        </div>
        {openFeedback ? (
          <div className="feedbackPanel">
            <h2 className="heading">Thank you so much for taking the time!</h2>
            <h2 className="subheading">Please provie the below details!</h2>
            <form action="">
              <label>First Name:</label>
              <input
                type="text"
                onChange={(e) => setfirstname(e.target.value)}
                value={firstname}
              />
              <label>Last Name:</label>
              <input
                type="text"
                onChange={(e) => setlastname(e.target.value)}
                value={lastname}
              />
              <label>Address:</label>
              <textarea
                className="address"
                type="text"
                onChange={(e) => setaddress(e.target.value)}
                value={address}
              />
              <label>Country:</label>
              <div className="countryTab">
                <input
                  type="text"
                  onChange={(e) => setcountry(e.target.value)}
                  value={country}
                />
                <svg
                  onClick={() =>
                    showsuggestion ? setshowsuggestion(false) : searchCountry()
                  }
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20L15.514 15.506L20 20ZM18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z"
                    stroke="#A4A4A4"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                {showsuggestion ? (
                  <div className="suggestiontab">
                    {countryresults.map((item) => {
                      return (
                        <div
                          className="suggestionItem"
                          onClick={() => handleSuggestionSelect(item)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <label>Email ID:</label>
              <div className="emailFlex">
                <input
                  type="text"
                  placeholder="example@sample.com"
                  onChange={(e) => setemail(e.target.value)}
                />
                {emailError ? (
                  <h2 className="error">Please enter a valid e-mail</h2>
                ) : null}
              </div>
              <label>Phone Number:</label>
              <div className="phoneTab">
                <div className="phoneFlex">
                  <div className="dialCode">{dialcode}</div>
                  <input
                    type="text"
                    placeholder="123456789"
                    onChange={(e) =>
                      setphone(e.target.value.replace(/\D/g, ""))
                    }
                    value={phone}
                  />
                  {phoneError ? (
                    <h2 className="error">Please enter a valid number</h2>
                  ) : null}
                </div>
              </div>
            </form>
            <div className="submitButton" onClick={handleSubmit}>
              Submit Feedback
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LeftPanel;
