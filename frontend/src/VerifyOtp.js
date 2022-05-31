import { useCookies } from "react-cookie";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function VerifyOtp() {
  let [otp, setOtp] = useState("");
  let [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.isAuthenticated == "true") {
      navigate("/home");
    }
  }, []);

  let navigate = useNavigate();
  const verifyOtp = async (e) => {
    setError("");
    e.preventDefault();

    if (!cookies.email) {
      setError("Session Expires");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = {
      email: cookies.email,
      otp: otp,
    };

    let options = {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(data),
    };
    let registerUser = await fetch(
      "http://localhost:3000/api/user/verifyOtp",
      options
    );
    let response = await registerUser.json();

    if (response.status === "success") {
      setCookie("isAuthenticated", true);

      navigate("/home");
    } else {
      setError(response.error.substring(0, 50));
    }
  };

  return (
    <>
      <form className="container" onSubmit={verifyOtp}>
        <div>
          {" "}
          <h4>Otp Validation</h4>
        </div>
        <div>
          <input
            type="text"
            className="form-input"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <div>
          <h4 className="error">{error}</h4>
        </div>
        <div>
          <button className="submit-btn">Verify OTP</button>
        </div>
      </form>
    </>
  );
}

export default VerifyOtp;
