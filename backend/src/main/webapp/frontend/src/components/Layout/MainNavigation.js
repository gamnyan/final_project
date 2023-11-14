import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Container, Nav, Navbar } from "react-bootstrap";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
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

// const pages = ["커뮤니티", "사진첩"];
// const pagesTo = ["community", "picture"];
// const settings = ["마이페이지", "로그아웃"];
// const settingsTo = ["profile", "toggleLogoutHandler"];

export function UserProfile() {
  const authCtx = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;

  const updateProfile = (email, nickname, password) => {
    setUserProfile({
      email: email,
      nickname: nickname,
      password: password,
    });
  };

  useEffect(() => {
    if (isLogin) {
      authCtx.getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    if (isGet) {
      const { email, nickname, password } = authCtx.userObj;
      updateProfile(email, nickname, password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGet]);

  return userProfile;
}

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const userProfile = UserProfile();
  let isLogin = authCtx.isLoggedIn;

  useEffect(() => {
    if (isLogin) {
      authCtx.getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const toggleLogoutHandler = () => {
    authCtx.logout();
    navigate("/1/1", { replace: true });
  };

  const [isToggle, setIsToggle] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleToggleOpen = () => {
    setIsToggle(!isToggle);
  };

  const [btnToggle, setBtnToggle] = useState(false);

  const clupPageHandler = () => {
    let num = 1;
    return "/club/clubpage/" + num;
  };

  return (
    <Fragment>
      <header id="header-area">
        <PC>
          <Navbar className="nav-gnb nav-gnb-lg">
            <div className="nav-container">
              <div>
                <Navbar.Brand href="/1/1" className="logoStyled">
                  AVADO
                </Navbar.Brand>
                <ul className="nav-menu">
                  <li className="linkStyled">
                    <Link to="/1/1">홈</Link>
                  </li>
                  <li className="linkStyled">
                    <Nav.Link href={clupPageHandler()}>모임</Nav.Link>
                  </li>
                </ul>
              </div>
            </div>
            {isLogin === false ? (
              <ul className="nav-user nav-logouted">
                <li className="linkStyled">
                  <Nav.Link href="/login">로그인</Nav.Link>
                </li>
                <li className="linkStyled">
                  <Nav.Link href="/signup">회원가입</Nav.Link>
                </li>
              </ul>
            ) : (
              <ul className="nav-user nav-logined">
                <li>
                  <NavLink to="/profile">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                    {userProfile.nickname}
                  </NavLink>
                </li>
                <li>
                  <button onClick={toggleLogoutHandler}>로그아웃</button>
                </li>
              </ul>
            )}
          </Navbar>
        </PC>
        <Mobile>
          <Navbar className="nav-gnb">
            <Container>
              <Navbar.Brand href="/1/1" className="logoStyled">
                Logo
              </Navbar.Brand>

              <div
                className={
                  btnToggle ? "mobileMenuWrap active" : "mobileMenuWrap"
                }
              >
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
                      <NavLink to="/profile">{userProfile.nickname}</NavLink>
                    </li>
                    <li>
                      <button onClick={toggleLogoutHandler}>Logout</button>
                    </li>
                  </ul>
                )}
                <div className="menuWrap">
                  <ul className="nav-menu">
                    <li className="linkStyled">
                      <Nav.Link href="/1/1">Home</Nav.Link>
                    </li>
                    <li className="linkStyled">
                      <Nav.Link href="moim">Moim</Nav.Link>
                    </li>
                    <li className="linkStyled">
                      <Nav.Link href="/chat">Chat</Nav.Link>
                    </li>
                    <li className="linkStyled">
                      <Nav.Link href="/gallery">Gallery</Nav.Link>
                    </li>
                    <li className="linkStyled">
                      <Nav.Link href="#">Community</Nav.Link>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className="nav-btn"
                onClick={() => setBtnToggle(!btnToggle)}
                style={btnToggle ? { color: "#fff" } : { color: "#000" }}
              >
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
