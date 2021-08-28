import axios from "axios";

// login
export const loginHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  let loginData;

  try {
    loginData = await axios.post("http://localhost:8000/api/user/login", {
      ...data,
    });

    dispatch({
      type: "LOGIN",
      payload: {
        uid: loginData.data.uid,
        token: loginData.data.token,
        expiresAt: loginData.data.expiresAt,
      },
    });

    const localData = {
      uid: loginData.data.uid,
      token: loginData.data.token,
      expiresAt: loginData.data.expiresAt,
    };

    localStorage.setItem("auth", JSON.stringify(localData));
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// register
export const registerHandler = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  let registerData;

  try {
    registerData = await axios.post("http://localhost:8000/api/user/register", {
      ...data,
    });

    dispatch({
      type: "REGISTER",
      payload: {
        uid: registerData.data.uid,
        token: registerData.data.token,
        expiresAt: registerData.data.expiresAt,
      },
    });

    const localData = {
      uid: registerData.data.uid,
      token: registerData.data.token,
      expiresAt: registerData.data.expiresAt,
    };

    localStorage.setItem("auth", JSON.stringify(localData));
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

// logout
export const logOutHandler = () => (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  dispatch({
    type: "LOGOUT",
  });

  localStorage.removeItem("auth");
};

// on start check for auth
export const checkForAuth = () => async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  try {
    let authData = await localStorage.getItem("auth");

    authData = await JSON.parse(authData);
    if (!authData) {
      dispatch({
        type: "STOP_LOADING",
      });
    } else {
      const expireTime = authData.expiresAt;
      const timeNow = Date.now() / 1000;

      const isValidToken = expireTime > timeNow;

      if (isValidToken) {
        dispatch({
          type: "LOGIN",
          payload: {
            uid: authData.uid,
            token: authData.token,
            expiresAt: authData.expiresAt,
          },
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });

        localStorage.removeItem("auth");
      }
    }
  } catch (error) {
    console.error(error);
  }
};