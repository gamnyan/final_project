import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./Auth-action";

let logoutTimer;

const AuthContext = React.createContext({
   token: "",
   userObj: { email: "", nickname: "" },
   isLoggedIn: false,
   isSuccess: false,
   isGetSuccess: false,
   signup: (email, password, nickname) => {},
   checkEmail: email => {},
   login: (email, password) => {},
   logout: () => {},
   getUser: () => {},
   changeNickname: nickname => {},
   changePassword: (exPassword, newPassword) => {},
});

export const AuthContextProvider = props => {
   const tokenData = authAction.retrieveStoredToken();

   let initialToken;
   if (tokenData) {
      initialToken = tokenData.token;
   }

   const [token, setToken] = useState(initialToken);
   const [userObj, setUserObj] = useState({
      email: "",
      nickname: "",
   });

   const [isSuccess, setIsSuccess] = useState(false);
   const [isGetSuccess, setIsGetSuccess] = useState(false);

   const userIsLoggedIn = !!token;

   const signupHandler = (email, password, nickname) => {
      setIsSuccess(false);
      const response = authAction.signupActionHandler(email, password, nickname);
      response.then(result => {
         if (result !== null) {
            setIsSuccess(true);
         }
      });
   };

   const checkEmailHandler = email => {
      const response = authAction.checkDuplicateEmail(email);
      return response;
   };

   const loginHandler = (email, password) => {
      setIsSuccess(false);

      const data = authAction.loginActionHandler(email, password);
      data.then(result => {
         if (result !== null) {
            const loginData = result.data;
            setToken(loginData.accessToken);
            logoutTimer = setTimeout(
               logoutHandler,
               authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn),
            );
            setIsSuccess(true);
         }
      });
   };

   const logoutHandler = useCallback(() => {
      setToken("");
      authAction.logoutActionHandler();
      if (logoutTimer) {
         clearTimeout(logoutTimer);
      }
   }, []);

   const getUserHandler = () => {
      setIsGetSuccess(false);
      const data = authAction.getUserActionHandler(token);
      data.then(result => {
         if (result !== null) {
            const userData = result.data;
            setUserObj(userData);
            setIsGetSuccess(true);
         }
      });
   };

   const changeNicknameHandler = nickname => {
      setIsSuccess(false);
      const data = authAction.changeNicknameActionHandler(nickname, token);
      data.then(result => {
         if (result !== null) {
            // const userData = result.data;
            // setUserObj(userData);
            setIsSuccess(true);
         }
      });
   };

   const changePaswordHandler = (exPassword, newPassword) => {
      setIsSuccess(false);
      const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
      data.then(result => {
         if (result !== null) {
            setIsSuccess(true);
            logoutHandler();
         }
      });
   };

   useEffect(() => {
      if (tokenData) {
         logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
   }, [tokenData, logoutHandler]);

   const contextValue = {
      token,
      userObj,
      isLoggedIn: userIsLoggedIn,
      isSuccess,
      isGetSuccess,
      signup: signupHandler,
      checkEmail: checkEmailHandler,
      login: loginHandler,
      logout: logoutHandler,
      getUser: getUserHandler,
      changeNickname: changeNicknameHandler,
      changePassword: changePaswordHandler,
   };

   return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
