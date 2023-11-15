import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth-context";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
   Backdrop,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Slide,
} from "@mui/material";
import SignupEmail from "./CreateAccountForm/SignupEmail";
import SignupPassword from "./CreateAccountForm/SignupPassword";
import SignupNickname from "./CreateAccountForm/SignupNickname";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAccountForm = () => {
   const authCtx = useContext(AuthContext);
   let navigate = useNavigate();
   const defaultTheme = createTheme();
   const [isEmail, setIsEmail] = useState(true);
   const [isPassword, setIsPassword] = useState(true);
   const [isNickname, setIsNickname] = useState(true);
   const [open, setOpen] = useState(false);
   const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const nicknameInputRef = useRef(null);
   useEffect(() => {
      if (!isEmail) {
         if (!isPassword) {
            if (!isNickname) setIsSignupButtonDisabled(false);
         }
      }
   }, [isEmail, isPassword, isNickname]);

   const submitHandler = async event => {
      event.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;
      setIsLoading(true);
      authCtx.signup(enteredEmail, enteredPassword, enteredNickname);
      setIsLoading(false);
      handleClickOpen();
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      navigate("/login", { replace: true });
   };

   const enterhandleclose = () => {
      handleClose();
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
               <Typography component="h1" variant="h5">
                  회원가입
               </Typography>
               <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <SignupEmail setIsEmail={setIsEmail} emailInputRef={emailInputRef} />
                     <SignupPassword setIsPassword={setIsPassword} passwordInputRef={passwordInputRef} />
                     <SignupNickname setIsNickname={setIsNickname} nicknameInputRef={nicknameInputRef} />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSignupButtonDisabled}
                        onClick={handleClickOpen}>
                        회원가입
                     </Button>
                     {isLoading && (
                        <Backdrop open sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}>
                           <CircularProgress color="inherit" />
                        </Backdrop>
                     )}
                     <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle>{"로그인 성공"}</DialogTitle>
                        <DialogContent>
                           <DialogContentText id="alert-dialog-slide-description">
                              회원가입에 성공하셨습니다. 로그인창에서 로그인해주세요.
                           </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                           <Button onClick={handleClose} onKeyDown={e => e.key === "Enter" && enterhandleclose}>
                              확인
                           </Button>
                        </DialogActions>
                     </Dialog>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
};

export default CreateAccountForm;
