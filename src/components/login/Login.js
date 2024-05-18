import React, { useEffect, useState } from "react";
import "./login.css";
import { v4 as uuid } from "uuid";
import {
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, setUser, unSetCurrentUser } from "../../Store/action";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PDFfile from "../PDFfile";
import DialpadIcon from "@mui/icons-material/Dialpad";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allMeal.user);

  const [auth, setAuth] = useState({
    id: uuid(),
    username: "",
    mobileNumber: "",
    password: "",
    email: "",
  });
  const [login, setLogin] = useState({
    passwordLogin: "",
    any: "",
  });
  const [openSnackBar, setOpen] = useState({
    open: false,
    type: "",
  });
  useEffect(() => {
    dispatch(unSetCurrentUser());
  }, []);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setSignup] = useState(true);
  const [changeType, setChangeType] = useState(false);
  const messageMap = {
    signup: "Signup Successful",
    login: "Login Successful",
    emailExist: "This email already exists!",
    loginFailed: "Wrong Password",
    numberExist: "Someone is already registered with this number",
    empty: "Please fill the form",
    lessNumber: "Please enter a 10-digit mobile number.",
    passwordContain: "Password must have at least 8 characters.",
    userNotFound: "User not found. Please sign up.",
  };

  // Destructuring the keys from the object
  const { username, password, mobileNumber, email } = auth;
  const { open, type } = openSnackBar;
  const { passwordLogin, any } = login;
  useEffect(() => {
    if (type === "login" || type === "signup") {
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setOpen({
            open: false,
            type: "",
          });
          navigate("/mealplanner");
        }, 1500);
      }, 1000);
    }
  }, [type]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickChangeType = () => setChangeType(!changeType);
  const handleClose = () => {
    setOpen({
      open: false,
      type: "",
    });
    setLoading(false);
  };

  const handleShowSignUp = () => {
    setLogin({ passwordLogin: "", any: "" });
    setSignup(true);
  };
  const handleShowLogin = () => {
    setAuth({ password: "", username: "", email: "", mobileNumber: "" });
    setSignup(false);
  };

  const handleLogin = () => {
    if (passwordLogin.trim() !== "" && any.trim() !== "") {
      const userExist = user?.some(
        (user) =>
          user.mobileNumber === any ||
          user?.email.trim().toLowerCase() === any.toLowerCase().trim()
      );
      if (!userExist) {
        return setOpen({
          open: true,
          type: "userNotFound",
        });
      }
      const userFound = user?.filter(
        (user) =>
          (user.mobileNumber === any ||
            user?.email.trim().toLowerCase() === any.toLowerCase().trim()) &&
          user.password === passwordLogin
      );
      if (userFound.length > 0) {
        // Successful login
        const { username, id } = userFound[0];
        dispatch(setCurrentUser(id, username));
        setOpen({
          open: true,
          type: "login",
        });
      } else {
        // Invalid credentials for login
        setOpen({
          open: true,
          type: "loginFailed",
        });
      }
    } else {
      setOpen({
        open: true,
        type: "empty",
      });
    }
  };

  // With Optimization

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      password.trim() !== "" &&
      email.trim() !== ""
    ) {
      if (mobileNumber.trim().length !== 10) {
        return setOpen({
          open: true,
          type: "lessNumber",
        });
      }
      if (password.trim().length < 8) {
        return setOpen({
          open: true,
          type: "passwordContain",
        });
      }

      // Check if username already exists
      const emailExist = user?.some(
        (user) => user?.email.toLowerCase() === email.toLowerCase()
      );

      // Checking if the mobile number already exists
      const numberExist = user?.some(
        (user) => user.mobileNumber === mobileNumber
      );
      // Attempting to sign up
      if (emailExist) {
        setOpen({
          open: true,
          type: "emailExist",
        });
      } else if (numberExist) {
        setOpen({
          open: true,
          type: "numberExist",
        });
      } else {
        // Create new user
        dispatch(setUser(auth));
        setOpen({
          open: true,
          type: "signup",
        });
        setAuth({
          id: uuid(),
          password: "",
          username: "",
          email: "",
          mobileNumber: "",
        });
      }
    } else {
      // to send message the to fill the form
      setOpen({
        open: true,
        type: "empty",
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };
  const handleChangeLogin = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-form opacity">
        <Typography
          textAlign={"center"}
          textTransform={"uppercase"}
          variant="h5"
          mt={2}
          fontWeight={700}
        >
          {showSignup ? "Sign up" : "Sign in"}
        </Typography>

        {showSignup ? (
          <div className="login-form-inputs">
            <TextField
              id="signupUsername"
              fullWidth
              value={username}
              className="form-input"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <TextField
              id="signupEmail"
              fullWidth
              value={email}
              className="form-input"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              type="email"
              required
            />
            <TextField
              id="signupNumber"
              value={mobileNumber}
              fullWidth
              className="form-input"
              name="mobileNumber"
              placeholder="Mobile Number"
              onPaste={handleChange}
              onChange={handleChange}
              type="number"
            />
            <TextField
              id="signupPassword"
              fullWidth
              value={password}
              className="form-input"
              name="password"
              placeholder="Password"
              onPaste={handleChange}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        ) : (
          <div className="login-form-inputs signin">
            <TextField
              id="loginInput"
              fullWidth
              className="form-input"
              name="any"
              value={any}
              placeholder="Email or Mobile number"
              onChange={handleChangeLogin}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton
              //         aria-label="toggle type visibility"
              //         onClick={handleClickChangeType}
              //       >
              //         {changeType ? <DialpadIcon /> : <AlternateEmailIcon />}
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}

              // type={changeType ? "number" : "email"}
            />
            <TextField
              id="loginPassword"
              fullWidth
              className="form-input"
              name="passwordLogin"
              value={passwordLogin}
              placeholder="Password"
              onChange={handleChangeLogin}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
        <Button
          id="login"
          className="button"
          onClick={showSignup ? handleSignUp : handleLogin}
        >
          {showSignup ? "signup" : "Login"}
        </Button>

        <Typography
          onClick={showSignup ? handleShowLogin : handleShowSignUp}
          fontWeight={600}
          className="login_link"
        >
          {showSignup ? "Already have an Account! " : "Don't have an account? "}
          <Typography color="blue" variant="subtitle">
            {showSignup ? "Sign in" : "Sign up"}
          </Typography>
        </Typography>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={messageMap[type]}
      />
      {/* Backdrop to show Circular progress */}
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress size={60} color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
