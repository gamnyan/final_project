import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { Fragment, forwardRef, useContext, useEffect, useRef, useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AuthContext from "../../../Store/Auth-context";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MemberWithdraw = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [validatePasswordErrorMessage, setValidatePasswordErrorMessage] = useState("");
  const passwordInputRef = useRef(null);

  const [openSuccessWithdraw, setOpenSuccessWithdraw] = useState(false);

  const handleSuccessWithdrawOpen = () => {
    setOpenSuccessWithdraw(true);
  };

  const handleSuccessWithdrawClose = () => {
    setOpenSuccessWithdraw(false);
    // handleBackdropClose();
    navigate("/1/1", { replace: true });
  };

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

  // const handleBackdropClose = () => {
  //   props.setOpenBackdrop(false);
  // };
  // const handleBackdropOpen = () => {
  //   props.setOpenBackdrop(true);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsPassword(false);
    setOpen(false);
    handleSuccessWithdrawOpen();
  };

  useEffect(() => {
    if (authCtx.isWithdrawSuccess) {
      setIsPassword(false);
      // alert("그동안 이용해주셔서 감사합니다.");
      authCtx.logout();
      handleClose();
    } else {
      setIsPassword(true);
      setValidatePasswordErrorMessage("비밀번호를 알맞게 적어주시기 바랍니다.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx.isWithdrawSuccess]);

  const submitHandler = async event => {
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    await authCtx.memberWithdraw(enteredPassword);

    // setTimeout(() => {
    //   if (!authCtx.isWithdrawSuccess) {
    //     setIsPassword(true);
    //     setValidatePasswordErrorMessage("비밀번호를 다시 적어주세요.");
    //     handleBackdropClose();
    //   }
    //   if (authCtx.isWithdrawSuccess) {
    //     setIsPassword(false);
    //     alert("그동안 이용해주셔서 감사합니다.");
    //     authCtx.logout();
    //     handleClose();
    //   }
    // }, 1000);
  };
  return (
    <Fragment>
      <Button size="small" style={style} onClick={handleClickOpen}>
        변경
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>비밀번호</DialogTitle>
        <DialogContent>
          <DialogContentText>비밀번호를 적어주세요.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="비밀번호"
            type="password"
            fullWidth
            variant="standard"
            inputRef={passwordInputRef}
          />
          {isPassword && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ErrorOutlineIcon
                style={{
                  color: "#000000",
                  height: "20px",
                  marginTop: "0px",
                  marginRight: "3px",
                  fontSize: "16px",
                }}
              />
              <DialogContentText style={{ color: "#000000", fontSize: "12px" }}>
                {validatePasswordErrorMessage}
              </DialogContentText>
            </Box>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button variant="variant" onClick={handleClose} size="sm" style={{ marginRight: "auto" }}>
            취소
          </Button>
          <Button variant="variant" onClick={submitHandler} size="sm">
            변경
          </Button>
        </DialogActions>
        {/* {props.backdrop} */}
      </Dialog>
      <Fragment>
        <Dialog
          open={openSuccessWithdraw}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle>{"회원탈퇴 성공"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">그동안 이용해주셔서 감사합니다.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessWithdrawClose}>확인</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </Fragment>
  );
};
