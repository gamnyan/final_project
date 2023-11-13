import { Grid, TextField, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const SignupPassword = (props) => {
  const [passwordColor, setPasswordColor] = useState("primary");
  const [checkPasswordColor, setCheckPasswordColor] = useState("primary");
  const passwordConditions = (
    <>
      1. 8 ~ 20 이내 <br />
      2. 영문, 숫자, 특수문자 하나 이상 사용
    </>
  );
  const passwordInputRef = props.passwordInputRef;
  const checkPasswordInputRef = useRef(null);
  const validatePassword = (password) => {
    // password 유효성 검사 정규표현식
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()])[A-Za-z\d@$!%*#?&^()]{8,20}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = () => {
    const enteredPassword = passwordInputRef.current.value;
    const enteredCheckPassword = checkPasswordInputRef.current.value;
    const isPasswordValid = validatePassword(enteredPassword);
    if (isPasswordValid) {
      setPasswordColor("success");
      if (enteredPassword === enteredCheckPassword) {
        setCheckPasswordColor("success");
        props.setIsPassword(false);
      }
    }
    if (!isPasswordValid) setPasswordColor("error");
    if (enteredPassword !== enteredCheckPassword)
      setCheckPasswordColor("error");
  };
  return (
    <>
      <Grid item xs={11}>
        <TextField
          variant="standard"
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
      <Grid item xs={1}>
        <Tooltip title={passwordConditions} placement="right">
          <HelpOutlineIcon style={{ height: "56px" }} />
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
        <TextField
          variant="standard"
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
    </>
  );
};

export default SignupPassword;
