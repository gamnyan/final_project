import { Grid, TextField } from "@mui/material";
import { useState } from "react";

const SignupNickname = props => {
   const [nicknameColor, setNicknameColor] = useState("primary");
   const nicknameInputRef = props.nicknameInputRef;
   const validateNickname = nickname => {
      // 특수문자 사용 여부 체크
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (specialCharRegex.test(nickname)) {
         console.log("특수문자 사용 불가");
         return false;
      }

      // 한글 자음 모음 단독 사용 불가
      const koreanCharRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
      if (koreanCharRegex.test(nickname)) {
         console.log("한글 자음 모음 단독 사용 불가");
         return false;
      }

      // 한글은 영문의 글자수 두배로 취급
      const totalLength = nickname.split("").reduce((acc, char) => {
         return acc + (char.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/) ? 2 : 1);
      }, 0);

      // 글자수가 4글자 이상 24글자 이하인지 체크
      if (totalLength < 4 || totalLength > 24) {
         console.log("글자수는 4글자 이상 24글자 이하 사용 가능");
         return false;
      }

      // 모든 조건을 만족하면 유효한 닉네임
      console.log("유효한 닉네임");
      return true;
   };

   const handleInputChange = () => {
      // input 값이 바뀔 때마다 실행되는 함수
      const enteredNickname = nicknameInputRef.current.value;
      // 각각의 입력값에 대해 유효성 검사
      const isNicknameValid = validateNickname(enteredNickname);
      setNicknameColor(isNicknameValid ? "success" : "error");
      if (isNicknameValid) props.setIsNickname(false);
   };
   return (
      <>
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
      </>
   );
};

export default SignupNickname;
