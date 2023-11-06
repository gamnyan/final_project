import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ChangeUsername } from "./ChangeUsername";
import { ListItemButton } from "@mui/material";
import { useUser } from "../ContextProvider/UserContext";

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
   const userCtx = useUser();
   const [open, setOpen] = React.useState(false);

   const handleClickListItem = () => {
      setOpen(true);
   };

   const handleClose = newValue => {
      setOpen(false);

      // if (newValue) {
      //    setValue(newValue);
      // }
   };

   return (
      <React.Fragment>
         <CssBaseline />
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Typography component="h1" variant="h4" align="center">
                  My Page
               </Typography>
               <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                  <List component="div" role="group">
                     <ListItemButton divider disabled>
                        <ListItemText primary={userCtx.email} secondary="이메일" />
                     </ListItemButton>
                     <ChangeUsername
                        id="change-nickname"
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        handleClickListItem={handleClickListItem}
                        value={userCtx.nickname}
                     />
                  </List>
               </Box>
            </Paper>
         </Container>
      </React.Fragment>
   );
}
