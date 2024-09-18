import React, { useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication status

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false); // Simulate logout
  };

  return (
    <>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg custom_nav ps-5" style={{ height: "70px" }}>
        <div className="container-fluid">
          <div>
            <a className="navbar-brand " href="#" style={{ color: "#f1f1f1", fontSize: "40px", fontFamily: "gabriola" }}>
              <span style={{ fontFamily: "polo", fontSize: "70px", color: "#8b0000" }}>L</span>UM
              <span style={{ fontFamily: "polo", fontSize: "70px", color: "#8b0000" }}>I</span>NA
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto pe-5" style={{ color: "white" }}>
              <Link className="nav-link active" to="/" style={{ color: "white" }} aria-current="page">Home</Link>
              <Link className="nav-link" to="/aboutus" style={{ color: "white" }}>About Us</Link>
              <a className="nav-link" style={{ color: "white" }} aria-disabled="true">Contact</a>
              {isLoggedIn ? (
                <button className="nav-link btn btn-danger" onClick={handleLogout} style={{ color: "white" }}>Logout</button>
              ) : (
                <Link className="nav-link btn btn-success" to="/signIn" style={{ color: "white" }}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
