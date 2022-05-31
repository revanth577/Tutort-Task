import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./SignIn";
import Registration from "./Registration";
import VerifyOtp from "./VerifyOtp";
import Home from "./Home";

import React from "react";

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<SignIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
