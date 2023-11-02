import { Alert, Button, Grid, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { checkDuplicateEmail } from "../../../Store/Auth-action";
import AuthContext from "../../../Store/Auth-context";

const SignupEmail = () => {
   const authCtx = useContext(AuthContext);

   const [emailColor, setEmailColor] = useState("primary");
   const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
   const [isCheckEmailButtonDisabled, setIsCheckEmailButtonDisabled] = useState(true);
   const [isCheckEmailDisabled, setIsCheckEmailDisabled] = useState(true);
   const [isEmailDuplicateButtonDisabled, setIsEmailDuplicateButtonDisabled] = useState(true);

   const emailInputRef = useRef(null);
   const checkEmailInputRef = useRef(null);

   const validateEmail = email => {
      // email 유효성 검사 정규표현식
      const emailRegex = /^[^\s@]{3,20}@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   // input 값이 바뀔 때마다 실행되는 함수
   const handleInputEmailChange = () => {
      const enteredEmail = emailInputRef.current.value;
      // const enteredCheckEmail = checkEmailInputRef.current.value;
      // 각각의 입력값에 대해 유효성 검사
      const isEmailValid = validateEmail(enteredEmail);

      setIsEmailDuplicateButtonDisabled(!isEmailValid);
      setEmailColor(isEmailValid ? "success" : "error");
   };

   const checkDuplicateEmailHandler = async () => {
      // 현재 입력된 이메일 가져오기
      const enteredEmail = emailInputRef.current.value;

      // 이메일 중복 체크를 위한 비동기 함수 호출
      const duplicateCheckResponse = await checkDuplicateEmail(enteredEmail);

      // 중복 여부에 따라 메시지 업데이트
      if (!duplicateCheckResponse) {
         // 중복된 이메일이 없는 경우
         authCtx.sendEmail(enteredEmail);
         setIsCheckEmailDisabled(false);
         setIsCheckEmailButtonDisabled(false);
      }
      if (duplicateCheckResponse) {
         // 중복된 이메일이 있는 경우
         setIsEmailDuplicate(true);
         // setIsDuplicateMessage("이미 가입된 이메일입니다.");
         emailInputRef.current.focus();
      }
   };

   const checkEmailHandler = async () => {
      // const enteredCheckEmail = checkEmailInputRef.current.value;
   };

   return (
      <>
         <Grid item xs={8}>
            <TextField
               autoComplete="email"
               name="email"
               required
               fullWidth
               id="email"
               label="이메일"
               type="email"
               inputRef={emailInputRef}
               autoFocus
               onChange={handleInputEmailChange}
               color={emailColor}
            />
         </Grid>
         <Grid item xs={4}>
            <Button
               variant="outlined"
               disabled={isEmailDuplicateButtonDisabled}
               fullWidth
               onClick={checkDuplicateEmailHandler}
               sx={{ mt: 0 }}
               style={{ fontSize: "13px", height: "56px" }}>
               인증메일 발송
            </Button>
         </Grid>
         <Grid item xs={12}>
            {isEmailDuplicate && (
               <Alert variant="outlined" severity="error">
                  이미 사용중인 이메일 주소입니다.
               </Alert>
            )}
         </Grid>
         <Grid item xs={8}>
            <TextField
               autoComplete="check-email"
               name="checkEmail"
               required
               fullWidth
               id="checkEmail"
               label="인증번호"
               type="email"
               disabled={isCheckEmailDisabled}
               inputRef={checkEmailInputRef}
               onChange={handleInputEmailChange}
               color={emailColor}
            />
         </Grid>
         <Grid item xs={4}>
            <Button
               variant="outlined"
               disabled={isCheckEmailButtonDisabled}
               fullWidth
               onClick={checkEmailHandler}
               sx={{ mt: 0 }}
               style={{ fontSize: "13px", height: "56px" }}>
               인증메일 발송
            </Button>
         </Grid>
      </>
   );
};

export default SignupEmail;
