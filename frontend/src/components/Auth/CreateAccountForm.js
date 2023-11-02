import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth-context";
import SignupEmail from "./CreateAccountForm/SignupEmail";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { checkDuplicateEmail } from "../../Store/Auth-action";
// import SignupSuccess from "./AuthComponents/SignupSuccess";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAccountForm = () => {
   let navigate = useNavigate();
   /** 버튼 disabled */
   // const [isCheckEmailButtonDisabled, setIsCheckEmailButtonDisabled] = useState(true);
   const [isSingupButtonDisabled, setIsSingupButtonDisabled] = useState(true);

   // const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
   // const [isDuplicateMessage, setIsDuplicateMessage] = useState("이메일 중복체크");

   const [checkEmailColor, setcheckEmailColor] = useState("primary");
   const [passwordColor, setPasswordColor] = useState("primary");
   const [checkPasswordColor, setCheckPasswordColor] = useState("primary");
   const [nicknameColor, setNicknameColor] = useState("primary");
   // const [duplicateColor, setDuplicateColor] = useState("primary");
   const [open, setOpen] = React.useState(false);

   const authCtx = useContext(AuthContext);
   // const checkEmailInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const checkPasswordInputRef = useRef(null);
   const nicknameInputRef = useRef(null);

   const defaultTheme = createTheme();

   const validatePassword = password => {
      // password 유효성 검사 정규표현식
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()])[A-Za-z\d@$!%*#?&^()]{8,20}$/;
      return passwordRegex.test(password);
   };

   const validateCheckPassword = (password, confirmPassword) => {
      // password 유효성 검사 정규표현식
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()])[A-Za-z\d@$!%*#?&^()]{8,20}$/;
      // 비밀번호 확인이 처음 입력한 비밀번호와 일치하는지 확인
      const isMatch = password === confirmPassword;
      return passwordRegex.test(password) && isMatch;
   };

   const validateNickname = nickname => {
      // nickname 유효성 검사
      return nickname.length >= 2;
   };

   const handleInputChange = () => {
      // input 값이 바뀔 때마다 실행되는 함수
      // const enteredEmail = emailInputRef.current.value;
      // const enteredCheckEmail = checkEmailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredCheckPassword = checkPasswordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;

      // 각각의 입력값에 대해 유효성 검사
      // const isEmailValid = validateEmail(enteredEmail);
      const isPasswordValid = validatePassword(enteredPassword);
      const isCheckPasswordValid = validateCheckPassword(enteredPassword, enteredCheckPassword);
      const isNicknameValid = validateNickname(enteredNickname);

      // setIsEmailDuplicateButtonDisabled(!isEmailValid);
      // setEmailColor(isEmailValid ? "success" : "error");
      setPasswordColor(isPasswordValid ? "success" : "error");
      setCheckPasswordColor(isCheckPasswordValid ? "success" : "error");
      setNicknameColor(isNicknameValid ? "success" : "error");
      // if (!isEmailValid) {
      //    setIsDuplicateMessage("이메일 중복체크");
      //    setDuplicateColor("primary");
      // }

      // 모든 조건을 만족하면 버튼 활성화
      setIsSingupButtonDisabled(
         !(
            // isEmailValid &&
            (
               isPasswordValid &&
               isCheckPasswordValid &&
               isNicknameValid ===
                  // && duplicateColor
                  "success"
            )
         ),
      );
   };

   // const checkDuplicateEmailHandler = async () => {
   //    // 현재 입력된 이메일 가져오기
   //    const enteredEmail = emailInputRef.current.value;

   //    // 이메일 중복 체크를 위한 비동기 함수 호출
   //    const duplicateCheckResponse = await checkDuplicateEmail(enteredEmail);

   //    // 중복 여부에 따라 메시지 업데이트
   //    if (!duplicateCheckResponse) {
   //       // 중복된 이메일이 없는 경우
   //       authCtx.sendEmail(enteredEmail);
   //       setIsCheckEmailButtonDisabled(false);
   //       // setIsDuplicateMessage("중복된 이메일이 없습니다.");
   //       // setDuplicateColor("success");
   //       passwordInputRef.current.focus();
   //    }
   //    if (duplicateCheckResponse) {
   //       // 중복된 이메일이 있는 경우
   //       setIsEmailDuplicate(true);
   //       // setIsDuplicateMessage("이미 가입된 이메일입니다.");
   //       setDuplicateColor("error");
   //       emailInputRef.current.focus();
   //       setTimeout(() => {
   //          setIsDuplicateMessage("이메일 중복체크");
   //          setDuplicateColor("primary");
   //       }, 2000);
   //    }
   // };

   // const checkEmailHandler = async () => {
   //    const enteredCheckEmail = checkEmailInputRef.current.value;
   // };

   const submitHandler = async event => {
      event.preventDefault();

      // const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;

      authCtx.signup(
         // enteredEmail,
         enteredPassword,
         enteredNickname,
      );
      handleClickOpen();

      // if (authCtx.isSuccess) {
      // await navigate("/login", { replace: true });
      // }
   };

   const enterSubmitHandler = event => {
      submitHandler(event);
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
               {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar> */}
               <Typography component="h1" variant="h5">
                  회원가입
               </Typography>
               <Box
                  component="form"
                  noValidate
                  onSubmit={submitHandler}
                  onKeyDown={e => e.key === "Enter" && enterSubmitHandler(e)}
                  sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <SignupEmail />
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="new-password"
                           name="password"
                           required
                           fullWidth
                           id="password"
                           label="비밀번호"
                           type="password"
                           inputRef={passwordInputRef}
                           onChange={handleInputChange}
                           color={passwordColor}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="check-password"
                           name="checkPassword"
                           required
                           fullWidth
                           id="checkPassword"
                           label="비밀번호 확인"
                           type="password"
                           inputRef={checkPasswordInputRef}
                           onChange={handleInputChange}
                           color={checkPasswordColor}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="nickname"
                           name="nickname"
                           required
                           fullWidth
                           id="nickname"
                           label="닉네임"
                           inputRef={nicknameInputRef}
                           onChange={handleInputChange}
                           color={nicknameColor}
                        />
                     </Grid>
                     {/* <Grid item xs={12}>
                        <FormControlLabel
                           control={<Checkbox value="allowExtraEmails" color="primary" />}
                           label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                     </Grid> */}
                     {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSingupButtonDisabled}>
                        Sign Up
                     </Button> */}
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSingupButtonDisabled}
                        // onClick={handleClickOpen}
                        // onKeyDown={e => e.key === "Enter" && props.isSingupButtonDisabled}
                     >
                        회원가입
                     </Button>
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
                     {/* <Grid container justifyContent="flex-end">
                        <Grid item>
                           <Link href="/login" variant="body2">
                              Already have an account? Sign in
                           </Link>
                        </Grid>
                     </Grid> */}
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
};

export default CreateAccountForm;
