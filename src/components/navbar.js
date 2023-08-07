import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar () {
  const { loggedIn } = useAuth();

  return(
    <>
    <div className="navbar">
      <h2>VU Forms</h2>
      <div className="nav">
        {loggedIn ? (
          <>
            <Link to="/addform" className="links">
              Add Forms
            </Link>
            <Link to="/viewform" className="links">
              View Forms
            </Link>
            <Link to="/sendforms" className="links">
              Send Forms
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="links">
              Login
            </Link>
            <Link to="/signup" className="links">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  </>
  );
}

export default Navbar;