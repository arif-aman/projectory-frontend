import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

// acitons
import {
  fetchUserInfo,
  updateUserInfo,
  changePass,
} from "../actions/userAction";

// styles
const useStyles = makeStyles((theme) => ({
  mtLg: {
    marginTop: 10,
  },
  formContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: "80%",

    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  form: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      marginTop: 20,
    },
  },
  formInput: {
    marginBottom: 20,
    width: "100%",
  },
}));

const ProfileEdit = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { res, user, isLoading, error } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const userId = pathname.split("/")[2];

  const [oldData, setOldData] = useState({
    firstName: "",
    lastName: "",
    tagLine: "",
    location: "",
    description: "",
    avatar: "",
  });
  const [changePassData, setChangePassData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  // if not logged in
  if (!token) {
    history.push("/auth");
  }

  // form schema
  let schema;
  if (user) {
    schema = yup.object().shape({
      firstName: yup.string().default(user.firstName).required("required"),
      lastName: yup.string().default(user.lastName).required("required"),
      tagLine: yup.string().default(user.tagLine).required("required"),
      location: yup
        .string()
        .max(20)
        .default(user.location)
        .required("required"),
      description: yup
        .string()
        .min(50)
        .max(150)
        .default(user.description)
        .required("required"),
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // fetch user data
  useEffect(() => {
    const fetchInfo = async () => await dispatch(fetchUserInfo(userId));
    fetchInfo();

    if (user) {
      setOldData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        tagLine: user.tagLine || "",
        location: user.location || "",
        description: user.description || "",
        avatar: user.avatar || "",
      });
    }

    return async () => {
      await dispatch({ type: "LOADING_USER" });
      await dispatch({ type: "CLEAR_USER" });
    };
  }, []);

  // handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUserInfo(oldData, token));
  };

  // change pass handler
  const changePassHandler = async (e) => {
    e.preventDefault();
    if (
      changePassData.confirmPassword === "" ||
      changePassData.password === "" ||
      changePassData.currentPassword === ""
    ) {
      return;
    }
    await dispatch(changePass(changePassData, token));
  };

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mt={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gridGap={20}
          boxShadow={3}
          borderRadius={5}
          p={5}
          mb={5}
        >
          <Box>
            <Typography variant="h6" className={classes.mtLg}>
              Email: {user.email}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" className={classes.mtLg}>
              User Name: {user.userName}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" align="center" className={classes.mtLg}>
          Edit Info
        </Typography>

        {/* update form */}
        <Container className={classes.formContainer}>
          {error && (
            <Alert className={classes.mtLg} severity="error">
              {error}
            </Alert>
          )}
          {res && (
            <Alert className={classes.errorText} severity="success">
              {res}
            </Alert>
          )}
          <form onSubmit={handleSubmit()} className={classes.form}>
            <TextField
              label="Avatar"
              variant="outlined"
              value={oldData.avatar}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, avatar: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="First Name"
              variant="outlined"
              value={oldData.firstName}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, firstName: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={oldData.lastName}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, lastName: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Tag Line"
              variant="outlined"
              value={oldData.tagLine}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, tagLine: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={oldData.location}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, location: e.target.value };
                })
              }
              className={classes.formInput}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={oldData.description}
              onChange={(e) =>
                setOldData((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
              className={classes.formInput}
            />
            {isLoading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={submitHandler}
              >
                Update
              </Button>
            )}
          </form>
        </Container>
      </Box>
      {/* change pass form */}
      <Container className={classes.formContainer}>
        <Typography variant="h4" align="center" className={classes.mtLg}>
          Change Password
        </Typography>
        {error && (
          <Alert className={classes.mtLg} severity="error">
            {error}
          </Alert>
        )}
        <form onSubmit={changePassHandler} className={classes.form}>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            required={true}
            value={changePassData.currentPassword}
            onChange={(e) =>
              setChangePassData((prev) => {
                return { ...prev, currentPassword: e.target.value };
              })
            }
            className={classes.formInput}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            required={true}
            value={changePassData.password}
            onChange={(e) =>
              setChangePassData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
            className={classes.formInput}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            required={true}
            value={changePassData.confirmPassword}
            onChange={(e) =>
              setChangePassData((prev) => {
                return { ...prev, confirmPassword: e.target.value };
              })
            }
            className={classes.formInput}
          />

          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={(e) => changePassHandler(e)}
            >
              Change
            </Button>
          )}
        </form>
      </Container>
    </Container>
  );
};

export default ProfileEdit;
