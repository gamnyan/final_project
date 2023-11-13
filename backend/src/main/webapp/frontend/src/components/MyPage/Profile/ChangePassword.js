import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AuthContext from "../../../Store/Auth-context";
import { useNavigate } from "react-router-dom";

export const ChangePassword = props => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [validatePasswordErrorMessage, setValidatePasswordErrorMessage] = useState("");
  const exPasswordInputRef = useRef(null);
  const newPasswordInputRef = useRef(null);
  const newPasswordAgainInputRef = useRef(null);
  const passwordConditions = (
    <>
      1. 8 ~ 20 이내 <br />
      2. 영문, 숫자, 특수문자 하나 이상 사용
    </>
  );

  const style = {
    background: "#00000069",
    borderColor: "#00000069",
    fontSize: "11px",
    marginTop: "-10px",
    marginBottom: "-10px",
    marginLeft: "10px",
    color: "white",
    paddingLeft: "8px", // 왼쪽 여백 조절
    paddingRight: "8px", // 오른쪽 여백 조절
  };

  const validatePassword = password => {
    // 1. 8~20 이내
    if (password.length < 8 || password.length > 20) {
      setValidatePasswordErrorMessage("8 ~ 20 이내로 입력해주세요.");
      return false;
    }

    // 2. 영문 반드시 사용
    if (!/[a-zA-Z]/.test(password)) {
      setValidatePasswordErrorMessage("하나 이상의 영문을 사용해주세요.");
      return false;
    }

    // 3. 숫자 반드시 사용
    if (!/\d/.test(password)) {
      setValidatePasswordErrorMessage("하나 이상의 숫자를 사용해주세요.");
      return false;
    }

    // 4. 특수문자 반드시 사용
    if (!/[@$!%*#?&^()]/.test(password)) {
      setValidatePasswordErrorMessage("하나 이상의 특수문자를 사용해주세요.");
      return false;
    }

    // 모든 조건을 만족하면 유효한 패스워드
    return true;
  };

  const handleBackdropClose = () => {
    props.setOpenBackdrop(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsPassword(false);
    setOpen(false);
    handleBackdropClose();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (authCtx.isChangePasswordSuccess) {
      alert("다시 로그인 하세요.");
      authCtx.logout();
      handleClose();
    } else {
      setValidatePasswordErrorMessage("기존 비밀번호를 다시 적어주세요.");
      // handleBackdropClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx.isChangePasswordSuccess]);

  const submitHandler = async event => {
    event.preventDefault();
    const enteredExPassword = exPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;
    const isPasswordValid = validatePassword(enteredNewPasswordAgain);
    if (isPasswordValid) {
      if (enteredNewPassword === enteredNewPasswordAgain) {
        await authCtx.changePassword(enteredExPassword, enteredNewPasswordAgain);
        //   handleBackdropOpen();
        // setTimeout(() => {
        //    if (!authCtx.isChangePasswordSuccess) {
        //       setValidatePasswordErrorMessage("기존 비밀번호를 다시 적어주세요.");
        //       handleBackdropClose();
        //    }
        //    if (authCtx.isChangePasswordSuccess) {
        //       alert("다시 로그인 하세요.");
        //       authCtx.logout();
        //       handleClose();
        //    }
        // }, 500);
      }
      if (enteredNewPassword !== enteredNewPasswordAgain) {
        setValidatePasswordErrorMessage("비밀번호가 다릅니다.");
      }
    } else {
      setIsPassword(true);
    }
  };
  return (
    <Fragment>
      <Button size="small" style={style} onClick={handleClickOpen}>
        변경
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>비밀번호</DialogTitle>
        <DialogContent>
          <DialogContentText>기존 비밀번호와 변경하실 비밀번호를 각각 적어주세요.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="기존 비밀번호"
            type="password"
            fullWidth
            variant="standard"
            inputRef={exPasswordInputRef}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              margin="dense"
              label="변경 비밀번호"
              type="password"
              fullWidth
              variant="standard"
              inputRef={newPasswordInputRef}
            />
            <Tooltip title={passwordConditions} placement="right">
              <HelpOutlineIcon style={{ height: "20px", marginTop: "10px", marginLeft: "8px", fontSize: "20px" }} />
            </Tooltip>
          </Box>
          {isPassword && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title={passwordConditions} placement="right">
                <ErrorOutlineIcon
                  style={{
                    color: "#ff0000bd",
                    height: "20px",
                    marginTop: "0px",
                    marginRight: "3px",
                    fontSize: "16px",
                  }}
                />
              </Tooltip>
              <DialogContentText style={{ color: "#ff0000bd", fontSize: "12px" }}>
                {validatePasswordErrorMessage}
              </DialogContentText>
            </Box>
          )}
          <TextField
            margin="dense"
            label="변경 비밀번호"
            type="password"
            fullWidth
            variant="standard"
            inputRef={newPasswordAgainInputRef}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button variant="variant" onClick={handleClose} size="sm" style={{ marginRight: "auto" }}>
            취소
          </Button>
          <Button variant="variant" onClick={submitHandler} size="sm">
            변경
          </Button>
        </DialogActions>
        {props.backdrop}
      </Dialog>
    </Fragment>
  );
};
