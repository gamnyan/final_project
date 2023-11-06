import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "../../Store/Auth-context";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const authCtx = useContext(AuthContext);
   const [userProfile, setUserProfile] = useState({
      email: "",
      nickname: "",
      password: "",
   });

   useEffect(() => {
      if (authCtx.isLoggedIn) {
         console.log("Fetching user data...");
         authCtx.getUser();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [authCtx.isLoggedIn]);

   useEffect(() => {
      if (authCtx.isGetSuccess) {
         console.log("Updating user profile...");
         const { email, nickname, password } = authCtx.userObj;
         setUserProfile({ email, nickname, password });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [authCtx.isGetSuccess]);

   return <UserContext.Provider value={userProfile}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
