import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ChangeUsername } from "./ChangeUsername";
import { ChangePassword } from "./ChangePassword";
import { UserProfile } from "../Layout/MainNavigation";

export default function AddressForm() {
   const userProfile = UserProfile();
   const [open, setOpen] = React.useState(false);
   const [value, setValue] = React.useState(userProfile.nickname);

   const handleClickListItem = () => {
      setOpen(true);
   };

   const handleClose = newValue => {
      setOpen(false);

      if (newValue) {
         setValue(newValue);
      }
   };

   return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
         <List component="div" role="group">
            <ListItem button divider disabled>
               <ListItemText primary={userProfile.email} secondary="이메일" />
            </ListItem>
            <ListItem
               button
               divider
               aria-haspopup="true"
               aria-controls="change-nickname"
               aria-label="change nickname"
               onClick={handleClickListItem}>
               <ListItemText primary={value} secondary="닉네임 수정" />
               <ChangeUsername id="change-nickname" keepMounted open={open} onClose={handleClose} value={value} />
            </ListItem>
            <ChangePassword id="change-password" keepMounted open={open} onClose={handleClose} value={value} />
            <ListItem
               button
               divider
               aria-haspopup="true"
               aria-controls="change-password"
               aria-label="phone ringtone"
               onClick={handleClickListItem}>
               <ListItemText primary="비밀번호 수정" />
            </ListItem>
         </List>
      </Box>
   );
}

// import * as React from "react";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import { UserProfile } from "../Layout/MainNavigation";
// import { Button } from "@mui/material";

// export default function AddressForm() {
//    const userProfile = UserProfile();
//    return (
//       <React.Fragment>
//          <Typography variant="h6" gutterBottom>
//             Profile
//          </Typography>
//          <Grid container spacing={3}>
//             <Grid item xs={12}>
//                <TextField
//                   required
//                   disabled
//                   name="userEmail"
//                   label="Email"
//                   value={userProfile.email}
//                   fullWidth
//                   variant="standard"
//                />
//             </Grid>
//             <Grid item xs={12} md={9}>
//                <TextField
//                   required
//                   name="userNickname"
//                   label="Nickname"
//                   value={userProfile.nickname}
//                   fullWidth
//                   inputProps={{
//                      readOnly: true,
//                   }}
//                   variant="standard"
//                   style={{
//                      float: "left",
//                   }}
//                />
//             </Grid>
//             <Grid item xs={12} md={3}>
//                <Button style={{ top: 10 }}>수정하기</Button>
//             </Grid>
//          </Grid>
//       </React.Fragment>
//    );
// }
