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
import ArticleListPage from "./Pages/article/ArticleListPage";
import CreateArticlePage from "./Pages/article/CreateArticlePage";
import UpdateArticlePage from "./Pages/article/UpdateArticlePage";
import ArticleOnePage from "./Pages/article/ArticleOnePage";
import ClubOnePage from "./Pages/club/ClubOnePage";
import ClubListPage from "./Pages/club/ClubListPage";

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
                  <Route path="/page/:pageId" element={<ArticleListPage />} />
                  <Route path="/create" element={authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to="/" />} />
                  <Route
                     path="/update/:articleId"
                     element={authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to="/" />}
                  />
                  <Route path="/article/:articleId" element={<ArticleOnePage />} />
                  <Route path="/clubpage/:pageId" element={<ClubListPage />} />
                  <Route path="/club/:clubId" element={<ClubOnePage />} />
               </Routes>
            </Layout>
         </UserProvider>
      </AuthContextProvider>
   );
}

export default App;
