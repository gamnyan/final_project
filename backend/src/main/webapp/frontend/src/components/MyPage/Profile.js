import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
   Backdrop,
   CircularProgress,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   styled,
} from "@mui/material";
import { useUser } from "../ContextProvider/UserContext";
import { Button } from "react-bootstrap";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeNickname } from "./Profile/ChangeNickname";
import { ChangePassword } from "./Profile/ChangePassword";

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

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));

export default function MainProfilePage() {
   const userCtx = useUser();
   const [openBackdrop, setOpenBackdrop] = useState(false);

   function createData(col1, col2) {
      return { col1, col2 };
   }

   const style = {
      background: "#00000069",
      borderColor: "#00000069",
      fontSize: "12px",
      marginTop: "-10px",
      marginBottom: "-10px",
      marginLeft: "5px",
   };

   const backdrop = (
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={openBackdrop}>
         <CircularProgress color="inherit" />
      </Backdrop>
   );

   const memberInformation = [
      createData("이메일", userCtx.email),
      createData(
         "닉네임",
         <>
            {userCtx.nickname}
            <ChangeNickname backdrop={backdrop} setOpenBackdrop={setOpenBackdrop} />
         </>,
      ),
      createData("비밀번호", <ChangePassword backdrop={backdrop} setOpenBackdrop={setOpenBackdrop} />),
      createData(
         "탈퇴신청",
         <Button size="sm" style={style}>
            탈퇴
         </Button>,
      ),
   ];

   return (
      <Box
         sx={{
            flexGrow: 1,
            display: "flex",
            height: "70vh",
            alignItems: "center",
            justifyContent: "center",
            // alignContent: "center",
         }}>
         <Grid container spacing={2}>
            <Grid xs={12} md={5} lg={4}>
               <Item>나중에 내 프로필 사진이나 등등 넣어둘 곳</Item>
            </Grid>
            <Grid container xs={12} md={7} lg={8} spacing={4}>
               <Grid xs={12} lg={12}>
                  <Item>
                     <Box sx={{ fontSize: "12px", textTransform: "uppercase" }}>
                        <h3>회원정보</h3>
                     </Box>
                     <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                        <TableContainer component={Paper}>
                           <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                 <TableRow>
                                    <TableCell>
                                       <strong>회원정보 설정</strong>
                                    </TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {memberInformation.map(meminfo => (
                                    <TableRow
                                       key={meminfo.col1}
                                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                       <TableCell
                                          component="th"
                                          scope="row"
                                          style={{
                                             background: "#8080803d",
                                             borderBottomColor: "#fff",
                                             width: "20vh",
                                          }}>
                                          {meminfo.col1}
                                       </TableCell>
                                       <TableCell align="left">{meminfo.col2}</TableCell>
                                    </TableRow>
                                 ))}
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                  </Item>
               </Grid>
            </Grid>
            <Grid
               xs={12}
               container
               justifyContent="space-between"
               alignItems="center"
               flexDirection={{ xs: "column", sm: "row" }}
               sx={{ fontSize: "12px" }}>
               <Grid sx={{ order: { xs: 2, sm: 1 } }}>{/* <Item>© Copyright</Item> */}</Grid>
               <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
                  {/* <Grid>
                     <Item>Link A</Item>
                  </Grid>
                  <Grid>
                     <Item>Link B</Item>
                  </Grid> */}
                  <Grid style={{ color: "white" }}>123{/* <Item>Link C</Item> */}</Grid>
               </Grid>
            </Grid>
         </Grid>
      </Box>
   );
}