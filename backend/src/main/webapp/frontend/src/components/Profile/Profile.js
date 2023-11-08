// import * as React from "react";
import { Fragment, useContext, useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
// import { ChangeUsername } from "./ChangeUsername";
import {
   Alert,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   ListItemButton,
   TextField,
} from "@mui/material";
import { useUser } from "../ContextProvider/UserContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth-context";

// function AddressForm() {
//    const userCtx = useUser();
//    const [open, setOpen] = React.useState(false);

//    const handleClickListItem = () => {
//       setOpen(true);
//    };

//    const handleClose = newValue => {
//       setOpen(false);

//       // if (newValue) {
//       //    setValue(newValue);
//       // }
//    };

//    return (
//       <>
//          <ListItemButton
//             divider
//             aria-haspopup="true"
//             aria-controls="change-password"
//             aria-label="phone ringtone"
//             onClick={handleClickListItem}>
//             <ListItemText primary="비밀번호 수정" />
//          </ListItemButton>
//          <ChangeUsername id="change-nickname" keepMounted open={open} onClose={handleClose} value="123" />
//       </>
//    );
// }

export default function MainProfilePage() {
   let navigate = useNavigate();
   const authCtx = useContext(AuthContext);
   const userCtx = useUser();
   const [open, setOpen] = useState(false);
   const [isNickname, setIsNickname] = useState(false);
   const nicknameInputRef = useRef(null);

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

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      authCtx.getUser();
      setIsNickname(false);
      setOpen(false);
   };

   const submitHandler = event => {
      // handleClose();
      event.preventDefault();
      const enteredNickname = nicknameInputRef.current.value;
      const isNicknameValid = validateNickname(enteredNickname);

      if (isNicknameValid) {
         // alert("변경 되었습니다.");
         authCtx.changeNickname(enteredNickname);
         handleClose();
         // navigate("/profile", { replace: true });
      } else {
         setIsNickname(true);
      }
   };

   return (
      <Fragment>
         <CssBaseline />
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Typography component="h1" variant="h4" align="center">
                  마이페이지
               </Typography>
               <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                  <List component="div" role="group">
                     <ListItemButton divider disabled>
                        <ListItemText primary={userCtx.email} secondary="이메일" />
                     </ListItemButton>
                     <ListItemButton divider>
                        <ListItemText primary={userCtx.nickname} onClick={handleClickOpen} secondary="닉네임" />
                     </ListItemButton>
                     <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>닉네임 수정하기</DialogTitle>
                        <DialogContent>
                           <DialogContentText>닉네임은 두글자 이상이어야 합니다.</DialogContentText>
                           <TextField
                              autoFocus
                              margin="dense"
                              id="change-nickname"
                              label="닉네임 수정"
                              inputRef={nicknameInputRef}
                              type="nickname"
                              fullWidth
                              variant="standard"
                           />
                           {isNickname && <Alert color="error">닉네임은 두글자 이상이어야 합니다.</Alert>}
                        </DialogContent>
                        <DialogActions>
                           <Button
                              onClick={submitHandler}
                              onKeyDown={event => event.key === "Enter" && submitHandler()}>
                              변경
                           </Button>
                           <Button onClick={handleClose}>취소</Button>
                        </DialogActions>
                     </Dialog>
                     {/* <ChangeUsername
                        id="change-nickname"
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        handleClickListItem={handleClickOpen}
                        value={userCtx.nickname}
                     /> */}
                  </List>
               </Box>
            </Paper>
         </Container>
      </Fragment>
   );
}
