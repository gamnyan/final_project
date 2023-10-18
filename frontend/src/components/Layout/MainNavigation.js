import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
// import AdbIcon from "@mui/icons-material/Adb";

import AuthContext from "../../Store/Auth-context";

function HomeIcon(props) {
   return (
      <SvgIcon {...props}>
         <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
   );
}

const pages = ["커뮤니티", "사진첩"];
const pagesTo = ["community", "picture"];
const settings = ["마이페이지", "로그아웃"];
const settingsTo = ["profile", "toggleLogoutHandler"];

const MainNavigation = () => {
   const authCtx = useContext(AuthContext);
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [nickname, setNickname] = useState("");
   let isLogin = authCtx.isLoggedIn;
   let isGet = authCtx.isGetSuccess;

   const callback = str => {
      setNickname(str);
   };

   const handleOpenNavMenu = event => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = event => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   useEffect(() => {
      if (isLogin) {
         console.log("start");
         authCtx.getUser();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLogin]);

   useEffect(() => {
      if (isGet) {
         console.log("get start");
         callback(authCtx.userObj.nickname);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isGet]);

   const toggleLogoutHandler = () => {
      authCtx.logout();
   };

   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Stack direction="row" spacing={3}>
                  <HomeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
               </Stack>
               {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}>
                  COW모임
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit">
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}>
                     {pages.map(page => (
                        <MenuItem key={page} itemRef={`/${pagesTo[pages.indexOf(page)]}`} onClick={handleCloseNavMenu}>
                           <Typography
                              sx={{ textDecoration: "none", textAlign: "center", color: "inherit" }}
                              textAlign="center"
                              component={Link}
                              to={`/${pagesTo[pages.indexOf(page)]}`}>
                              {page}
                           </Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <Stack direction="row" spacing={3}>
                  <HomeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
               </Stack>
               {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}>
                  COW모임
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map(page => (
                     <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        href={`/${pagesTo[pages.indexOf(page)]}`}
                        sx={{ my: 2, color: "white", display: "block" }}>
                        {page}
                     </Button>
                  ))}
               </Box>
               <Box sx={{ flexGrow: 0 }}>
                  {isLogin ? (
                     <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           <Avatar
                              alt="Remy Sharp"
                              //  src="/static/images/avatar/2.jpg"
                              src="/C:/Java/Java_eclipse/workspace/final_project/picture/123.jpg"
                           />
                        </IconButton>
                     </Tooltip>
                  ) : (
                     <>
                        <Button component={Link} to="/login" sx={{ my: 2, color: "white", display: "block" }}>
                           Login
                        </Button>
                        <Button component={Link} to="/signup" sx={{ my: 2, color: "white", display: "block" }}>
                           Sign-Up
                        </Button>
                     </>
                  )}
                  <Menu
                     sx={{ mt: "45px" }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}>
                     {settings.map(setting => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           {setting !== "로그아웃" && (
                              <Typography
                                 sx={{ textDecoration: "none", textAlign: "center", color: "inherit" }}
                                 component={Link}
                                 to={`/${settingsTo[settings.indexOf(setting)]}`}>
                                 {setting}
                              </Typography>
                           )}
                           {setting === "로그아웃" && (
                              <Typography
                                 sx={{ textDecoration: "none", textAlign: "center", color: "inherit" }}
                                 component={Button}
                                 onClick={toggleLogoutHandler}>
                                 {setting}
                              </Typography>
                           )}
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};

export default MainNavigation;
