import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

// action
import { logOutHandler } from "../../actions/authAction";

// styles
import "./Header.css";

const useStyles = makeStyles((theme) => ({
  logoutBtn: {
    marginTop: 10,
    paddingLeft: 20,
    [theme.breakpoints.up("md")]: {
      marginLeft: 10,
      marginTop: 0,
      paddingLeft: 0,
    },
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const classes = useStyles();

  // link lists
  let navLinks = [
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
    {
      title: "Login/Register",
      url: "/auth",
    },
  ];

  if (token) {
    navLinks = [
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
      {
        title: "Profile",
        url: "/user-profile",
      },
    ];
  }

  return (
    <div className="header">
      <h1 onClick={() => history.push("/")}>Projectory</h1>

      <nav className="header__list" id="nav">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <NavLink
              to={link.url}
              onClick={() =>
                document.getElementById("nav").classList.remove("show")
              }
              activeClassName="active"
              exact
            >
              {link.title}
            </NavLink>
          </li>
        ))}
        {token && (
          <li className={classes.logoutBtn}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={async () => {
                await dispatch(logOutHandler());
                document.getElementById("nav").classList.remove("show");
              }}
            >
              Logout
            </Button>
          </li>
        )}
      </nav>
      <div
        className="header__menu"
        onClick={() => document.getElementById("nav").classList.toggle("show")}
      >
        <HiMenuAlt3 />
      </div>
    </div>
  );
};

export default Header;
