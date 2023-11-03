import { Grid, TextField } from "@mui/material";
import { useState } from "react";

const SignupNickname = props => {
   const [nicknameColor, setNicknameColor] = useState("primary");
   const nicknameInputRef = props.nicknameInputRef;
   const validateNickname = nickname => {
      // nickname 유효성 검사
      return nickname.length >= 2;
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
