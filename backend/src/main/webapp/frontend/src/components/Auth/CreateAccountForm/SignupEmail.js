import { Alert, Button, Grid, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { checkDuplicateEmail } from "../../../Store/Auth-action";
import AuthContext from "../../../Store/Auth-context";

const SignupEmail = props => {
   const authCtx = useContext(AuthContext);
   const [isEmailDisabled, setIsEmailDisabled] = useState(false);
   // props.onSignupButtonDisabled(isEmailDisabled);
   const [isEmailDuplicateButtonDisabled, setIsEmailDuplicateButtonDisabled] = useState(false);
   const [emailDuplicateAlertInfo, setEmailDuplicateAlertInfo] = useState({
      isEmailDuplicateWarning: false,
      isEmailDuplicateSuccese: false,
   });
   const [checkEmailAlertInfo, setCheckEmailAlertInfo] = useState({
      isCheckEmailWarning: false,
      isCheckEmailSuccese: false,
   });
   const { isEmailDuplicateWarning, isEmailDuplicateSuccese } = emailDuplicateAlertInfo;
   const { isCheckEmailWarning, isCheckEmailSuccese } = checkEmailAlertInfo;
   const [isCheckEmailShowAndHide, setIsCheckEmailShowAndHide] = useState(false);
   const [isCheckEmailDisabled, setIsCheckEmailDisabled] = useState(false);
   const [isCheckEmailButtonDisabled, setIsCheckEmailButtonDisabled] = useState(false);
   const [checkEmailCode, setCheckEmailCode] = useState(null);

   const showEmailDuplicateAlert = (variant, message) => {
      setEmailDuplicateAlertInfo({
         isEmailDuplicateWarning: variant === "error",
         isEmailDuplicateSuccese: variant === "success",
         message,
      });
   };
   const showCheckEmailAlert = (variant, message) => {
      setCheckEmailAlertInfo({
         isCheckEmailWarning: variant === "error",
         isCheckEmailSuccese: variant === "success",
         message,
      });
   };

   const emailInputRef = props.emailInputRef;
   const checkEmailInputRef = useRef(null);
   const isEmailValid = email => {
      // 간단한 이메일 형식 정규표현식 사용
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };
   const checkDuplicateEmailHandler = async () => {
      // 현재 입력된 이메일 가져오기
      const enteredEmail = emailInputRef.current.value;
      // 이메일 중복 체크를 위한 비동기 함수 호출
      const duplicateCheckResponse = await checkDuplicateEmail(enteredEmail);
      if (!isEmailValid(enteredEmail)) {
         setIsCheckEmailShowAndHide(false);
         setCheckEmailAlertInfo({
            isCheckEmailWarning: false,
            isCheckEmailSuccese: false,
         });
         showEmailDuplicateAlert("error", "올바른 이메일 주소를 입력해주세요.");
         return;
      } else {
         // 중복 여부에 따라 메시지 업데이트
         if (!duplicateCheckResponse) {
            // 중복된 이메일이 없는 경우
            const emailCode = authCtx.sendEmail(enteredEmail);
            setCheckEmailCode(emailCode);
            showEmailDuplicateAlert("success", "인증메일이 발송되었습니다. 인증번호를 적어주세요.");
            setIsCheckEmailShowAndHide(true);
         }
         if (duplicateCheckResponse) {
            // 중복된 이메일이 있는 경우
            showEmailDuplicateAlert("error", "이미 사용중인 이메일 주소입니다.");
            setCheckEmailAlertInfo({
               isCheckEmailWarning: false,
               isCheckEmailSuccese: false,
            });
            setIsCheckEmailShowAndHide(false);
            // setIsEmailDuplicateWarning(true);
            // setIsDuplicateMessage("이미 가입된 이메일입니다.");
            emailInputRef.current.focus();
         }
      }
   };
   const checkEmailHandler = () => {
      const enteredCheckEmail = checkEmailInputRef.current.value;
      checkEmailCode.then(result => {
         if (result === parseInt(enteredCheckEmail)) {
            setIsEmailDisabled(true);
            setIsEmailDuplicateButtonDisabled(true);
            setIsCheckEmailDisabled(true);
            setIsCheckEmailButtonDisabled(true);
            showCheckEmailAlert("success", "인증번호 확인!");
            props.setIsEmail(false);
         }
         if (result !== parseInt(enteredCheckEmail)) {
            showCheckEmailAlert("error", "인증번호를 다시 확인하고 적어주세요.");
            checkEmailInputRef.current.focus();
         }
      });
   };
   return (
      <>
         <Grid item xs={7}>
            <TextField
               variant="standard"
               autoComplete="email"
               name="email"
               disabled={isEmailDisabled}
               required
               fullWidth
               id="email"
               label="이메일"
               type="email"
               inputRef={emailInputRef}
               // autoFocus
            />
         </Grid>
         <Grid item xs={4}>
            <Button
               variant="text"
               disabled={isEmailDuplicateButtonDisabled}
               fullWidth
               onClick={checkDuplicateEmailHandler}
               sx={{ mt: 0 }}
               style={{ fontSize: "13px", height: "56px" }}>
               인증메일 발송
            </Button>
         </Grid>
         {(isEmailDuplicateWarning || isEmailDuplicateSuccese) && (
            <Grid item xs={11}>
               <Alert
                  variant="outlined"
                  style={{ fontSize: "12px" }}
                  severity={isEmailDuplicateWarning ? "error" : "success"}>
                  {emailDuplicateAlertInfo.message}
               </Alert>
            </Grid>
         )}
         {isCheckEmailShowAndHide && (
            <>
               <Grid item xs={7}>
                  <TextField
                     variant="standard"
                     autoComplete="check-email"
                     name="checkEmail"
                     required
                     fullWidth
                     id="checkEmail"
                     label="인증번호"
                     type="email"
                     disabled={isCheckEmailDisabled}
                     inputRef={checkEmailInputRef}
                  />
               </Grid>
               <Grid item xs={4}>
                  <Button
                     variant="text"
                     disabled={isCheckEmailButtonDisabled}
                     fullWidth
                     onClick={checkEmailHandler}
                     sx={{ mt: 0 }}
                     style={{ fontSize: "13px", height: "56px" }}>
                     인증번호 확인
                  </Button>
               </Grid>
            </>
         )}
         {(isCheckEmailWarning || isCheckEmailSuccese) && (
            <Grid item xs={11}>
               <Alert
                  variant="outlined"
                  style={{ fontSize: "12px" }}
                  severity={isCheckEmailWarning ? "error" : "success"}>
                  {checkEmailAlertInfo.message}
               </Alert>
            </Grid>
         )}
      </>
   );
};

export default SignupEmail;
