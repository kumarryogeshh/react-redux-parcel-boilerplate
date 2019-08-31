import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="ui secondary menu">
      <NavLink className="header item" to="/">
        Our Company
      </NavLink>
      <NavLink className="right item" to="/products">
        Products
      </NavLink>
      <NavLink className="item" to="/locations">
        Locations
      </NavLink>
      <NavLink className="item" to="/about">
        About Us
      </NavLink>
    </div>
  );
};

export default Navbar;
