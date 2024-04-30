import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../../firebase";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const user1 = auth.currentUser;
  //here we get the admin state.
  const adminState = useSelector((state) => state.admin.adminState);
  console.log("admin state1", adminState)

  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentPath == "/" ? "active" : ""}>
          Home
        </Link>

        <Link
          to="/podcasts"
          className={currentPath == "/podcasts" ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath == "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath == "/profile" ? "active" : ""}
        >
          Profile
        </Link>

        <Link
          to="/enquiry-form"
          className={currentPath == "/enquiry-form" ? "active" : ""}
        >
          Enquiry Form
        </Link>

        {adminState ? (
          <Link
            to="/admin"
            className={currentPath == "/adminnpm " ? "active" : ""}
          >
            Admin
          </Link>
        ) : (<Link
          to="/adminlogin"
          className={currentPath == "/adminlogin" ? "active" : ""}
        >
          Admin
        </Link>)}


        {!user1 ? (<Link to="/sign" className={currentPath == "/sign" ? "active" : ""}>
          Signup
        </Link>) : (<Link to="/logout" className={currentPath == "/logout" ? "active" : ""}>
          Logout
        </Link>)}
      </div>
    </div>
  );
}

export default Header;
