import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// import styled from "styled-components";
import { Container, Nav, Navbar } from "react-bootstrap";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/header.css";

import AuthContext from "../../Store/Auth-context";

export const Mobile = ({ children }) => {
   const isMobile = useMediaQuery({
      query: "(max-width:768px)",
   });

   return <>{isMobile && children}</>;
};

export const PC = ({ children }) => {
   const isPc = useMediaQuery({
      query: "(min-width:769px)",
   });

   return <>{isPc && children}</>;
};

/** 삭제해도 되는 건가? */
// function HomeIcon(props) {
//    return (
//       <SvgIcon {...props}>
//          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//       </SvgIcon>
//    );
// }

// const pages = ["커뮤니티", "사진첩"];
// const pagesTo = ["community", "picture"];
// const settings = ["마이페이지", "로그아웃"];
// const settingsTo = ["profile", "toggleLogoutHandler"];

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

   const [isToggle, setIsToggle] = useState(false);

   // eslint-disable-next-line no-unused-vars
   const handleToggleOpen = () => {
      setIsToggle(!isToggle);
   };

   const [btnToggle, setBtnToggle] = useState(false);

   return (
      <Fragment>
         <header id="header-area">
            <PC>
               <Navbar className="nav-gnb nav-gnb-lg">
                  <Container>
                     <Navbar.Brand href="/" className="logoStyled">
                        Logo
                     </Navbar.Brand>
                     <ul className="nav-menu">
                        <li className="linkStyled">
                           <Link to="#">gallery</Link>
                        </li>
                        <li className="linkStyled">
                           <Link to="#">chat</Link>
                        </li>
                        <li className="linkStyled">
                           <Link to="#">settings</Link>
                        </li>
                     </ul>
                  </Container>
                  {isLogin === false ? (
                     <ul className="nav-user nav-logouted">
                        <li className="linkStyled">
                           <Nav.Link href="/login">Login</Nav.Link>
                        </li>
                        <li className="linkStyled">
                           <Nav.Link href="/signup">Sign-Up</Nav.Link>
                        </li>
                     </ul>
                  ) : (
                     <ul className="nav-user nav-logined">
                        <li>
                           <NavLink to="/profile">
                              <FontAwesomeIcon icon={faUser} size="2x" />
                              {nickname}
                           </NavLink>
                        </li>
                        <li>
                           <button onClick={toggleLogoutHandler}>Logout</button>
                        </li>
                     </ul>
                  )}
               </Navbar>
            </PC>
            <Mobile>
               <Navbar className="nav-gnb">
                  <Container>
                     <Navbar.Brand href="/" className="logoStyled">
                        Logo
                     </Navbar.Brand>

                     <div className={btnToggle ? "mobileMenuWrap active" : "mobileMenuWrap"}>
                        {isLogin === false ? (
                           <ul className="nav-user nav-logouted">
                              <li className="linkStyled">
                                 <Nav.Link href="/login">Login</Nav.Link>
                              </li>
                              <li className="linkStyled">
                                 <Nav.Link href="/signup">Sign-Up</Nav.Link>
                              </li>
                           </ul>
                        ) : (
                           <ul className="nav-user nav-logined">
                              <li>
                                 <NavLink to="/profile">{nickname}</NavLink>
                              </li>
                              <li>
                                 <button onClick={toggleLogoutHandler}>Logout</button>
                              </li>
                           </ul>
                        )}
                        <div className="menuWrap">
                           <ul className="nav-menu">
                              <li className="linkStyled">
                                 <Nav.Link href="/">home</Nav.Link>
                              </li>
                              <li className="linkStyled">
                                 <Nav.Link href="#">gallery</Nav.Link>
                              </li>
                              <li className="linkStyled">
                                 <Nav.Link href="#">chat</Nav.Link>
                              </li>
                              <li className="linkStyled">
                                 <Nav.Link href="#">settings</Nav.Link>
                              </li>
                           </ul>
                        </div>
                     </div>

                     <button
                        className="nav-btn"
                        onClick={() => setBtnToggle(!btnToggle)}
                        style={btnToggle ? { color: "#fff" } : { color: "#000" }}>
                        {btnToggle ? (
                           <FontAwesomeIcon icon={faXmark} size="2x" />
                        ) : (
                           <FontAwesomeIcon icon={faBars} size="2x" />
                        )}
                     </button>
                  </Container>
               </Navbar>
            </Mobile>
         </header>
      </Fragment>
   );
};

export default MainNavigation;

/* 
    <header>
      {isLogin === false ? (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="signup">Sign-Up</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/profile">{nickname}</Link>
          </li>
          <li>
            <button onClick={toggleLogoutHandler}>Logout</button>
          </li>
        </ul>
      )}
    </header>


*/

/* 
<PC>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">gallery</Nav.Link>
            <Nav.Link href="#">chat</Nav.Link>
          </Nav>
          {isLogin === false ? (
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign-Up</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link href="/profile">{nickname}</Nav.Link>
              <button onClick={toggleLogoutHandler}>Logout</button>
            </Nav>
          )}
        </PC>
 */

/* 
                <Navbar className="gnb gnb_lg">
          <Container>
            <div style={{ display: "flex" }}>
              <Navbar.Brand href="/" className="nav-logo-link">
                Home
              </Navbar.Brand>
              <Nav className="ml-auto">
                <ul className="menu">
                  <li>
                    <Nav.Link href="#" className="nav-menu-list">
                      gallery
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href="#" className="nav-menu-list">
                      chat
                    </Nav.Link>
                  </li>
                </ul>
              </Nav>
            </div>
            {isLogin === false ? (
              <Nav className="ml-auto">
                <ul className="menu">
                  <li>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href="/signup">Sign-Up</Nav.Link>
                  </li>
                </ul>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <li>
                  <Nav.Link href="/profile">{nickname}</Nav.Link>
                </li>
                <li>
                  <button onClick={toggleLogoutHandler}>Logout</button>
                </li>
              </Nav>
            )}
          </Container>
        </Navbar>
        */
