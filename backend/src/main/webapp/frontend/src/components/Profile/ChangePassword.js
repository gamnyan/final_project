import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const options = [
   "비밀번호",
   "Atria",
   "Callisto",
   "Dione",
   "Ganymede",
   "Hangouts Call",
   "Luna",
   "Oberon",
   "Phobos",
   "Pyxis",
   "Sedna",
   "Titania",
   "Triton",
   "Umbriel",
];

function ChangePassword(props) {
   const { onClose, value: valueProp, open, ...other } = props;
   const [value, setValue] = React.useState(valueProp);
   const radioGroupRef = React.useRef(null);

   React.useEffect(() => {
      if (!open) {
         setValue(valueProp);
      }
   }, [valueProp, open]);

   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose(value);
   };

   const handleChange = event => {
      setValue(event.target.value);
   };

   return (
      <>
         <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}>
            <DialogTitle>Phone Ringtone</DialogTitle>
            <DialogContent dividers>
               <RadioGroup
                  ref={radioGroupRef}
                  aria-label="ringtone"
                  name="ringtone"
                  value={value}
                  onChange={handleChange}>
                  {options.map(option => (
                     <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                  ))}
               </RadioGroup>
            </DialogContent>
            <DialogActions>
               <Button autoFocus onClick={handleCancel}>
                  Cancel
               </Button>
               <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}

ChangePassword.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   value: PropTypes.string.isRequired,
};

// import React, { useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../../Store/Auth-context";

// const ChangePassword = () => {
//    let navigate = useNavigate();

//    const authCtx = useContext(AuthContext);
//    const exPasswordInputRef = useRef(null);
//    const newPasswordInputRef = useRef(null);
//    const newPasswordAgainInputRef = useRef(null);

//    const submitHandler = event => {
//       event.preventDefault();
//       const enteredExPassword = exPasswordInputRef.current.value;
//       const enteredNewPassword = newPasswordInputRef.current.value;
//       const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value;
//       if (enteredNewPassword !== enteredNewPasswordAgain) {
//          alert("비밀번호가 일치하지 않습니다!");
//          return;
//       }
//       authCtx.changePassword(enteredExPassword, enteredNewPassword);
//       if (authCtx.isSuccess) {
//          alert("다시 로그인 하세요.");
//          authCtx.logout();
//          navigate("/login", { replace: true });
//       }
//    };

//    return (
//       <form onSubmit={submitHandler}>
//          <div>
//             <label htmlFor="ex-password">Old Password</label>
//             <input
//                type="password"
//                id="ex-password"
//                minLength={8}
//                ref={exPasswordInputRef}
//                //
//             />
//             <label htmlFor="new-password">New Password</label>
//             <input
//                type="password"
//                id="new-password"
//                minLength={8}
//                ref={newPasswordInputRef}
//                //
//             />
//             <label htmlFor="new-password">New Password Again</label>
//             <input
//                type="password"
//                id="new-password-agian"
//                minLength={8}
//                ref={newPasswordAgainInputRef}
//                //
//             />
//          </div>
//          <div>
//             <button type="submit">Change Password</button>
//          </div>
//       </form>
//    );
// };

export { ChangePassword };
