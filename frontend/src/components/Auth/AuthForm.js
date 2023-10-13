import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AuthContext from "../../Store/Auth-context";

const AuthForm = () => {
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);

   let navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const authCtx = useContext(AuthContext);

   const submitHandler = async event => {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      setIsLoading(true);
      authCtx.login(enteredEmail, enteredPassword);
      setIsLoading(false);

      if (authCtx.isSuccess) {
         navigate("/", { replace: true });
      }
   };

   return (
      <section>
         <h1>Login</h1>
         <form onSubmit={submitHandler}>
            <div>
               <label htmlFor="email">Your email</label>
               <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div>
               <label htmlFor="password">Your password</label>
               <input type="password" id="password" required ref={passwordInputRef} />
            </div>
            <div>
               <button type="submit">Login</button>
               {isLoading && <p>Loading</p>}
               <p>Create Account</p>
            </div>
         </form>
      </section>
   );
};

export default AuthForm;