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
import { Fragment, useContext, useRef, useState } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AuthContext from "../../../Store/Auth-context";

export const ChangeNickname = props => {
   const authCtx = useContext(AuthContext);
   const [open, setOpen] = useState(false);
   const [isNickname, setIsNickname] = useState(false);
   const [validateNicknameErrorMessage, setValidateNicknameErrorMessage] = useState("");
   const nicknameInputRef = useRef(null);
   const nicknameConditions = (
      <>
         1. 4 ~ 24 이내(한글은 두글자 취급) <br />
         2. 한글 자음 모음 단독 사용 불가(ㄱ,ㄴ,ㄷ,ㅏ,ㅓ,ㅗ 등) <br />
         3. 특수문자 사용 불가
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

   const validateNickname = nickname => {
      // 공백 체크
      if (nickname.includes(" ")) {
         setValidateNicknameErrorMessage("공백 사용 불가");
         return false;
      }

      // 특수문자 사용 여부 체크
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (specialCharRegex.test(nickname)) {
         setValidateNicknameErrorMessage("특수문자 사용 불가");
         return false;
      }

      // 한글 자음 모음 단독 사용 불가
      const koreanCharRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
      if (koreanCharRegex.test(nickname)) {
         setValidateNicknameErrorMessage("한글 자음 모음 단독 사용 불가");
         return false;
      }

      // 한글은 영문의 글자수 두배로 취급
      const totalLength = nickname.split("").reduce((acc, char) => {
         return acc + (char.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/) ? 2 : 1);
      }, 0);

      // 글자수가 4글자 이상 24글자 이하인지 체크
      if (totalLength < 4 || totalLength > 24) {
         setValidateNicknameErrorMessage("글자수는 4글자 이상 24글자 이하 사용 가능");
         return false;
      }

      // 모든 조건을 만족하면 유효한 닉네임
      return true;
   };

   const handleBackdropClose = () => {
      props.setOpenBackdrop(false);
   };
   const handleBackdropOpen = () => {
      props.setOpenBackdrop(true);
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setIsNickname(false);
      setTimeout(() => {
         authCtx.getUser();
         setOpen(false);
         handleBackdropClose();
      }, 500);
   };

   const submitHandler = async event => {
      // handleClose();
      event.preventDefault();
      const enteredNickname = nicknameInputRef.current.value;
      const isNicknameValid = validateNickname(enteredNickname);

      if (isNicknameValid) {
         await authCtx.changeNickname(enteredNickname);
         handleClose();
         handleBackdropOpen();
      } else {
         setIsNickname(true);
      }
   };
   return (
      <Fragment>
         <Button size="small" style={style} onClick={handleClickOpen}>
            변경
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>닉네임 변경</DialogTitle>
            <DialogContent>
               <DialogContentText>사용하실 닉네임을 입력해주세요.</DialogContentText>
               <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                     autoFocus
                     margin="dense"
                     label="변경 닉네임"
                     type="text"
                     fullWidth
                     variant="standard"
                     inputRef={nicknameInputRef}
                  />
                  <Tooltip title={nicknameConditions} placement="right">
                     <HelpOutlineIcon
                        style={{ height: "20px", marginTop: "10px", marginLeft: "8px", fontSize: "20px" }}
                     />
                  </Tooltip>
               </Box>
               {isNickname && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                     <Tooltip title={nicknameConditions} placement="right">
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
                        {validateNicknameErrorMessage}
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
            {props.backdrop}
         </Dialog>
      </Fragment>
   );
};
