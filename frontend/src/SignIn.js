import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useCookies } from "react-cookie";

function SignIn() {
  let [email, setEmail] = useState("");
  let [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.isAuthenticated == "true") {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    setError("");
    e.preventDefault();
    if (email.length === 0) {
      setError("please check the fields...");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = {
      email: email,
    };

    let options = {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(data),
    };
    let registerUser = await fetch(
      "http://localhost:3000/api/user/login",
      options
    );
    let response = await registerUser.json();

    if (response.status === "success") {
      setCookie("email", email);
      setCookie("isAuthenticated", false);

      navigate("/verifyOtp");
    } else {
      setError(response.error.substring(0, 50));
    }
  };

  return (
    <>
      <form className="container" onSubmit={handleLogin}>
        <div>
          <h4 className="title">Login</h4>
        </div>
        <div>
          <input
            type="text"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <h4 className="error">{error}</h4>
        </div>
        <div>
          <button className="submit-btn">Login</button>
        </div>
      </form>
    </>
  );
}

export default SignIn;
