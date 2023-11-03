import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
import CreateAccountForm from "./components/Auth/CreateAccountForm";
import Layout from "./components/Layout/Layout";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/home/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import AuthContext from "./Store/Auth-context";
import "./css/reset.css";
import "./css/style.css";
import { UserProvider } from "./components/ContextProvider/UserContext";
import { AuthContextProvider } from "./Store/Auth-context";

function App() {
   const authCtx = useContext(AuthContext);

   return (
      <AuthContextProvider>
         <UserProvider>
            <Layout>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to="/" /> : <CreateAccountForm />} />
                  <Route path="/login/*" element={authCtx.isLoggedIn ? <Navigate to="/" /> : <AuthPage />} />
                  <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ProfilePage />} />
               </Routes>
            </Layout>
         </UserProvider>
      </AuthContextProvider>
   );
}

export default App;
