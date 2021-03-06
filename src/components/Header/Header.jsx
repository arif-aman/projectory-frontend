import { Box, Button, Container } from "@material-ui/core";
import React, { useState } from "react";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// internal imports
import logo from "../../assets/logo.svg";
import "./Header.css";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const { token } = useSelector((state) => state.auth);

  // link lists
  const navLinks = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Jobs",
      url: "/jobs",
    },
    {
      title: "Services",
      url: "/services",
    },
    {
      title: "About",
      url: "/about",
    },
  ];

  return (
    <Box position="fixed" top="0" left="0" right="0" zIndex="1000" bgcolor="#fff" boxShadow={2}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" px={1}>
          {/* ------------------------ logo ------------------ */}
          <Box
            maxHeight="70px"
            height="70px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="logo"
            onClick={() => history.push("/")}
          >
            <img src={logo} alt="logo" width="100%" style={{ cursor: "pointer" }} />
          </Box>

          {/* --------------------------- nav links ------------------------ */}
          <nav className="header__list" id="nav">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.url}
                  onClick={() => {
                    setIsMenuOpen((prev) => !prev);
                    document.getElementById("nav").classList.remove("show");
                  }}
                  activeClassName="active"
                  exact
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </nav>

          {/* ----------------------- menu icon for mobile view ------------------ */}
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            <div className="header__menu">
              {isMenuOpen ? (
                <AiOutlineClose
                  onClick={() => {
                    setIsMenuOpen((prev) => !prev);
                    document.getElementById("nav").classList.toggle("show");
                  }}
                />
              ) : (
                <HiMenuAlt3
                  onClick={() => {
                    setIsMenuOpen((prev) => !prev);
                    document.getElementById("nav").classList.toggle("show");
                  }}
                />
              )}
            </div>

            {/* ---------------------- profile, msg icons + login btn ---------------- */}
            {token ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <ProfileMenu />
                <Button onClick={() => history.push("/chats")}>
                  <Box fontSize="1.3rem">
                    <AiFillMessage />
                  </Box>
                </Button>
              </Box>
            ) : (
              <Box ml={1}>
                <Button variant="contained" color="primary" onClick={() => history.push("/auth")}>
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
