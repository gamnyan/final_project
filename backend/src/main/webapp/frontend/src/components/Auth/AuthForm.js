import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AuthContext from "../../Store/Auth-context";
import { Alert } from "@mui/material";
import { checkDuplicateEmail } from "../../Store/Auth-action";

const AuthForm = () => {
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);

   let navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const authCtx = useContext(AuthContext);
   const [isSigninFailed, setIsSigninFailed] = useState(false);
   const [loginErrorMessage, setLoginErrorMessage] = useState("");

   const defaultTheme = createTheme();

   const submitHandler = event => {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      setIsLoading(true);
      // 데이터 베이스에 이메일이 있으면 로그인 실행
      const duplicateCheckResponse = checkDuplicateEmail(enteredEmail);
      if (duplicateCheckResponse) {
         // const loginSuccess = authCtx.login(enteredEmail, enteredPassword);
         // console.log(loginSuccess);
         authCtx.login(enteredEmail, enteredPassword);
         const loginFunction = () => {
            if (!authCtx.isSuccess) {
               setLoginErrorMessage("비밀번호가 틀렸습니다. 다시 시도해주세요.");
               setIsLoading(false);
               setIsSigninFailed(true);
            } else {
               setIsLoading(false);
               return navigate("/", { replace: true });
            }
         };
         loginFunction();
         // setTimeout(() => {
         // }, 500);
      } else {
         setLoginErrorMessage("존재하지 않는 이메일입니다. 다시 시도해주세요.");
         setIsLoading(false);
         setIsSigninFailed(true);
      }

      // if (authCtx.isSuccess) {
      //    // navigate("/", { replace: true });
      // } else {
      //    setIsSigninFailed(true);
      // }
   };

   return (
      <ThemeProvider theme={defaultTheme}>
         <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
               item
               xs={false}
               sm={4}
               md={7}
               sx={{
                  backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
               <Box
                  sx={{
                     my: 8,
                     mx: 4,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                  }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign in
                  </Typography>
                  <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
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
                     <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                     <Grid item xs={12}>
                        {isSigninFailed && (
                           <Alert variant="outlined" style={{ fontSize: "12px" }} severity="error">
                              {loginErrorMessage}
                           </Alert>
                        )}
                     </Grid>
                     <Button type="submit" fullWidth variant="contained" color="info" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                     </Button>
                     {isLoading && (
                        <Typography component="p" variant="body2">
                           Loading
                        </Typography>
                     )}
                     <Grid container>
                        <Grid item xs>
                           <Link href="#" variant="body2">
                              Forgot password?
                           </Link>
                        </Grid>
                        <Grid item>
                           <Link href="/signup" variant="body2">
                              {"Don't have an account? Sign Up"}
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </ThemeProvider>
   );
};

export default AuthForm;
