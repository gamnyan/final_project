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
import AdbIcon from "@mui/icons-material/Adb";

import AuthContext from "../../Store/Auth-context";

const pages = ["Community", "Picture"];
const settings = ["Profile", "Logout"];

const MainNavigation = () => {
   const authCtx = useContext(AuthContext);
   const [nickname, setNickname] = useState("");
   let isLogin = authCtx.isLoggedIn;
   let isGet = authCtx.isGetSuccess;

   const callback = str => {
      setNickname(str);
   };

   useEffect(() => {
      if (isLogin) {
         console.log("start");
         authCtx.getUser();
      }
   }, [isLogin, authCtx]);

   useEffect(() => {
      if (isGet) {
         console.log("get start");
         callback(authCtx.userObj.nickname);
      }
   }, [isGet, authCtx]);

   const toggleLogoutHandler = () => {
      authCtx.logout();
   };

   return (
      //   <header>
      //      <Link to="/">
      //         <div>Home</div>
      //      </Link>
      //      <nav>
      //         <ul>
      //            <li>{!isLogin && <Link to="/login">Login</Link>}</li>
      //            <li>{!isLogin && <Link to="signup">Sign-Up</Link>}</li>
      //            <li>{isLogin && <Link to="/profile">{nickname}</Link>}</li>
      //            <li>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
      //         </ul>
      //      </nav>
      //  </header>
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}>
                  LOGO
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     // onClick={handleOpenNavMenu}
                     color="inherit">
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     // anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     // open={Boolean(anchorElNav)}
                     // onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}>
                     {pages.map(page => (
                        <MenuItem
                           key={page}
                           // onClick={handleCloseNavMenu}
                        >
                           <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
                  LOGO
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map(page => (
                     <Button
                        key={page}
                        // onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}>
                        {page}
                     </Button>
                  ))}
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton
                        //  onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: "45px" }}
                     id="menu-appbar"
                     //  anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     //        open={Boolean(anchorElUser)}
                     //  onClose={handleCloseUserMenu}
                  >
                     {settings.map(setting => (
                        <MenuItem
                           key={setting}
                           //  onClick={handleCloseUserMenu}
                        >
                           <Typography textAlign="center">{setting}</Typography>
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
