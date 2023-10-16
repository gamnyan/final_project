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

function Copyright(props) {
   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {"Copyright © "}
         <Link color="inherit" href="https://mui.com/">
            Your Website
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

const defaultTheme = createTheme();

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
      <ThemeProvider theme={defaultTheme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}>
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  로그인
               </Typography>
               <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     inputRef={emailInputRef}
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     inputRef={passwordInputRef}
                  />
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Remember me(이건 그냥 없앨까?)"
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                     로그인
                  </Button>
                  {isLoading && <p>Loading</p>}
                  <Grid container>
                     <Grid item xs>
                        <Link href="#" variant="body2">
                           Forgot password?
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link href="#" variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
         </Container>
      </ThemeProvider>

      // <section>
      //    <form onSubmit={submitHandler}>
      //       <div>
      //          <label htmlFor="email">Your email</label>
      //          <input type="email" id="email" required ref={emailInputRef} />
      //       </div>
      //       <div>
      //          <label htmlFor="password">Your password</label>
      //          <input type="password" id="password" required ref={passwordInputRef} />
      //       </div>
      //       <div>
      //          <button type="submit">Login</button>
      //          {isLoading && <p>Loading</p>}
      //          <p>Create Account</p>
      //       </div>
      //    </form>
      // </section>
   );
};

export default AuthForm;
