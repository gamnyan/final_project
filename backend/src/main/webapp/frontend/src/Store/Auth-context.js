import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./Auth-action";

let logoutTimer;

const AuthContext = React.createContext({
   member: undefined,
   isGetUpdateSuccess: false,
   token: "",
   userObj: { email: "", nickname: "" },
   isLoggedIn: false,
   isSuccess: false,
   isGetSuccess: false,
   signup: (email, password, nickname,filename) => {},
   sendEmail: email => {},
   checkEmail: email => {},
   login: (email, password) => {},
   logout: () => {},
   getUser: () => {},
   changeNickname: nickname => {},
   changePassword: (exPassword, newPassword) => {},
   changePhoto: () => {}
});

export const AuthContextProvider = props => {
   const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);
   const [member,setMember] = useState();
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

   const signupHandler = (email, password, nickname,filename) => {
      setIsSuccess(false);
      const response = authAction.signupActionHandler(email, password, nickname,filename);
      response.then(result => {
         if (result !== null) {
            setIsSuccess(true);
         }
      });
   };

   const sendEmailHandler = email => {
      const response = authAction.sendEmailActionHandler(email);
      return response;
   };

   const checkEmailHandler = email => {
      const response = authAction.checkDuplicateEmail(email);
      return response;
   };

   const loginHandler = async (email, password) => {
      setIsSuccess(false);

      const data = await authAction.loginActionHandler(email, password);
      /*data.then(result => {
         if (result !== null) {
            const loginData = result.data;
            setToken(loginData.accessToken);
            logoutTimer = setTimeout(
               logoutHandler,
               authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn),
            );
            setIsSuccess(true);
         }
      });*/
      if (data !== null) {
         const loginData = data.data;
         setToken(loginData.accessToken);
         logoutTimer = setTimeout(
            logoutHandler,
            authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn),
         );
         setIsSuccess(true);
      }

      return data;
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
      // if (data !== null) {
      //    setIsSuccess(true);
      // }
      // return data;
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

   const changeMemPhotoHandler = (token,file) =>{
      setIsSuccess(false);

      const formData = new FormData();
      formData.append("file",file);
      
      const data = authAction.changePhoto(token,formData);

      data.then(result => {
         if (result !== null) {
            console.log(isSuccess);
         }
      });
      setIsSuccess(true);
   }

   useEffect(() => {
      if (tokenData) {
         logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
   }, [tokenData, logoutHandler]);

   const contextValue = {
      member,
      isGetUpdateSuccess,
      token,
      userObj,
      isLoggedIn: userIsLoggedIn,
      isSuccess,
      isGetSuccess,
      signup: signupHandler,
      sendEmail: sendEmailHandler,
      checkEmail: checkEmailHandler,
      login: loginHandler,
      logout: logoutHandler,
      getUser: getUserHandler,
      changeNickname: changeNicknameHandler,
      changePassword: changePaswordHandler,
      changePhoto: changeMemPhotoHandler
   };

   return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
