import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth-context";
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

const CreateAccountForm = () => {
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [emailColor, setEmailColor] = useState("primary");
   const [passwordColor, setPasswordColor] = useState("primary");
   const [nicknameColor, setNicknameColor] = useState("primary");

   let navigate = useNavigate();
   const authCtx = useContext(AuthContext);
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const nicknameInputRef = useRef(null);

   const defaultTheme = createTheme();

   const validateEmail = email => {
      // email 유효성 검사 정규표현식
      const emailRegex = /^[^\s@]{3,20}@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const validatePassword = password => {
      // password 유효성 검사 정규표현식
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
      return passwordRegex.test(password);
   };

   const validateNickname = nickname => {
      // nickname 유효성 검사
      return nickname.length >= 2;
   };

   const handleInputChange = () => {
      // input 값이 바뀔 때마다 실행되는 함수
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;

      // 각각의 입력값에 대해 유효성 검사
      const isEmailValid = validateEmail(enteredEmail);
      const isPasswordValid = validatePassword(enteredPassword);
      const isNicknameValid = validateNickname(enteredNickname);

      setEmailColor(isEmailValid ? "success" : "error");
      setPasswordColor(isPasswordValid ? "success" : "error");
      setNicknameColor(isNicknameValid ? "success" : "error");

      // 모든 조건을 만족하면 버튼 활성화
      setIsButtonDisabled(!(isEmailValid && isPasswordValid && isNicknameValid));
   };

   const submitHandler = event => {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;

      authCtx.signup(enteredEmail, enteredPassword, enteredNickname);

      // if (authCtx.isSuccess) {
      return navigate("/login", { replace: true });
      // }
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
                  Sign up
               </Typography>
               <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="email"
                           name="email"
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           type="email"
                           inputRef={emailInputRef}
                           autoFocus
                           onChange={handleInputChange}
                           color={emailColor}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="new-password"
                           name="password"
                           required
                           fullWidth
                           id="password"
                           label="Password"
                           type="password"
                           inputRef={passwordInputRef}
                           onChange={handleInputChange}
                           color={passwordColor}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="nickname"
                           name="nickname"
                           required
                           fullWidth
                           id="nickname"
                           label="Nickname"
                           inputRef={nicknameInputRef}
                           onChange={handleInputChange}
                           color={nicknameColor}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormControlLabel
                           control={<Checkbox value="allowExtraEmails" color="primary" />}
                           label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                     </Grid>
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isButtonDisabled}>
                        Sign Up
                     </Button>
                     <Grid container justifyContent="flex-end">
                        <Grid item>
                           <Link href="/login" variant="body2">
                              Already have an account? Sign in
                           </Link>
                        </Grid>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
};

export default CreateAccountForm;
