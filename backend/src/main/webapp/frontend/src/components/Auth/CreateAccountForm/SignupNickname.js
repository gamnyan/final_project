import { Grid, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const SignupNickname = props => {
   const [nicknameColor, setNicknameColor] = useState("primary");
   const nicknameConditions = (
      <>
         1. 4 ~ 24 이내(한글은 두글자 취급) <br />
         2. 한글 자음 모음 단독 사용 불가(ㄱ,ㄴ,ㄷ,ㅏ,ㅓ,ㅗ 등) <br />
         3. 특수문자 사용 불가
      </>
   );
   const nicknameInputRef = props.nicknameInputRef;
   const validateNickname = nickname => {
      // 특수문자 사용 여부 체크
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (specialCharRegex.test(nickname)) {
         return false;
      }

      // 한글 자음 모음 단독 사용 불가
      const koreanCharRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
      if (koreanCharRegex.test(nickname)) {
         return false;
      }

      // 한글은 영문의 글자수 두배로 취급
      const totalLength = nickname.split("").reduce((acc, char) => {
         return acc + (char.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/) ? 2 : 1);
      }, 0);

      // 글자수가 4글자 이상 24글자 이하인지 체크
      if (totalLength < 4 || totalLength > 24) {
         return false;
      }

      // 모든 조건을 만족하면 유효한 닉네임
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
         <Grid item xs={11}>
            <TextField
               variant="standard"
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
         <Grid item xs={1}>
            <Tooltip title={nicknameConditions} placement="right">
               <HelpOutlineIcon style={{ height: "56px" }} />
            </Tooltip>
         </Grid>
      </>
   );
};

export default SignupNickname;
