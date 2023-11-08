import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AuthContext from "../../Store/Auth-context";
import { Alert } from "@mui/material";
import { checkDuplicateEmail } from "../../Store/Auth-action";
import { Stack } from "react-bootstrap";
import "../../css/button.css";

const AuthForm = () => {
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);

   let navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const authCtx = useContext(AuthContext);
   const [isSigninFailed, setIsSigninFailed] = useState(false);
   const [loginErrorMessage, setLoginErrorMessage] = useState("");

   const defaultTheme = createTheme();

   const submitHandler = async event => {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      setIsLoading(true);
      // 데이터 베이스에 이메일이 있으면 로그인 실행
      const duplicateCheckResponse = checkDuplicateEmail(enteredEmail);
      if (duplicateCheckResponse) {
         // const loginSuccess = authCtx.login(enteredEmail, enteredPassword);
         // console.log(loginSuccess);
         const data = authCtx.login(enteredEmail, enteredPassword);
         //const loginFunction = () => {
         /*if (!authCtx.isSuccess) {
            setLoginErrorMessage("비밀번호가 틀렸습니다. 다시 시도해주세요.");
            setIsLoading(false);
            setIsSigninFailed(true);
         } else {
            setIsLoading(false);
            return navigate("/", { replace: true });
         }*/
         if (data === null) {
            setLoginErrorMessage("비밀번호가 틀렸습니다. 다시 시도해주세요.");
            setIsLoading(false);
            setIsSigninFailed(true);
         } else {
            setIsLoading(false);
            return navigate("/", { replace: true });
         }

         //};
         //loginFunction();
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
                  {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                     <LockOutlinedIcon />
                  </Avatar> */}
                  <Typography component="h1" variant="h5">
                     로그인
                  </Typography>
                  <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
                     <TextField
                        margin="normal"
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailInputRef}
                     />
                     <TextField
                        margin="normal"
                        variant="standard"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={passwordInputRef}
                     />
                     {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                     {isSigninFailed && (
                        <Grid item xs={12}>
                           <Alert variant="outlined" style={{ fontSize: "12px" }} severity="error">
                              {loginErrorMessage}
                           </Alert>
                        </Grid>
                     )}
                     <div className="one-button-frame">
                        <button className="custom-btn btn-16" type="submit">
                           로그인
                        </button>
                     </div>
                     <Button
                        className="custom-btn btn-16"
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ color: "rgb(0 0 0 / 54%)", background: "#80808069" }}
                        sx={{ mt: 3, mb: 2 }}>
                        <strong>로그인</strong>
                     </Button>
                     <Stack direction="row" spacing={2}>
                        <Button style={{ color: "gray" }}>
                           <strong>로그인</strong>
                        </Button>
                        <Button disabled>Disabled</Button>
                        <Button href="#text-buttons">Link</Button>
                     </Stack>
                     {isLoading && (
                        <Typography component="p" variant="body2">
                           Loading
                        </Typography>
                     )}
                     <Grid container>
                        <Grid item xs>
                           <Link href="#" variant="body2">
                              비밀번호 찾기
                           </Link>
                        </Grid>
                        <Grid item>
                           <Link href="/signup" variant="body2">
                              {"회원가입"}
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
