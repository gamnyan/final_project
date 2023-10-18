import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../Store/Auth-context";

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

   return (
      <header>
         <Link to="/">
            <div>Home</div>
         </Link>
         <nav>
            <ul>
               <li>{!isLogin && <Link to="/login">Login</Link>}</li>
               <li>{!isLogin && <Link to="signup">Sign-Up</Link>}</li>
               <li>{isLogin && <Link to="/profile">{nickname}</Link>}</li>
               <li>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
            </ul>
         </nav>
      </header>
   );
};

export default MainNavigation;
