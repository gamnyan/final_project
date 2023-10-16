import React, { useRef, useContext } from "react";
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

const CreateAccountForm = () => {
   let navigate = useNavigate();
   const authCtx = useContext(AuthContext);
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const nicknameInputRef = useRef(null);

   const submitHandler = event => {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;

      authCtx.signup(enteredEmail, enteredPassword, enteredNickname);

      if (authCtx.isSuccess) {
         return navigate("/", { replace: true });
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
                  회원가입
               </Typography>
               <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                           inputRef={emailInputRef}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           id="nickname"
                           label="Nickname"
                           name="nickname"
                           autoComplete="nickname"
                           inputRef={nicknameInputRef}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="new-password"
                           inputRef={passwordInputRef}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FormControlLabel
                           control={<Checkbox value="allowExtraEmails" color="primary" />}
                           label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                     </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                     회원가입하기
                  </Button>
                  <Grid container justifyContent="flex-end">
                     <Grid item>
                        <Link href="#" variant="body2">
                           Already have an account? Sign in
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
         </Container>
      </ThemeProvider>
      // <section>
      //   <h1>Create Account</h1>
      //   <form onSubmit={submitHandler}>
      //     <div>
      //       <label htmlFor="email">Your email</label>
      //       <input type="email" id="email" required ref={emailInputRef} />
      //     </div>
      //     <div>
      //       <label htmlFor="password">Your password</label>
      //       <input
      //         type="password"
      //         id="password"
      //         required
      //         ref={passwordInputRef}
      //       />
      //     </div>
      //     <div>
      //       <label htmlFor="nickname">NickName</label>
      //       <input type="text" id="nickname" required ref={nicknameInputRef} />
      //     </div>
      //     <div>
      //       <button type="submit">Submit</button>
      //     </div>
      //   </form>
      // </section>
   );
};

export default CreateAccountForm;
