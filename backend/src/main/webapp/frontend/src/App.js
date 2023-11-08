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
import ArticleListPage from "./Pages/article/ArticleListPage";
import ArticleOnePage from "./Pages/article/ArticleOnePage";
import CreateArticlePage from "./Pages/article/CreateArticlePage";
import UpdateArticlePage from "./Pages/article/UpdateArticlePage";
import UpdateCommentPage from "./Pages/article/UpdateCommentPage";
import ClubListPage from "./Pages/club/ClubListPage";
import ClubOnePage from "./Pages/club/ClubOnePage";
import CreateClubPage from "./Pages/club/CreateClubPage";
import UpdateClubPage from "./Pages/club/UpdateClubPage";
import "./css/reset.css";
import "./css/style.css";
import { UserProvider } from "./components/ContextProvider/UserContext";
import { AuthContextProvider } from "./Store/Auth-context";

import Test1 from "./components/Club/Test1";
import Test2 from "./components/Club/Test2";
import Test3 from "./components/Club/Test3";
import ChatPage from "./Pages/chatting/ChatPage";
import ChatRoom from "./Pages/chatting/ChatRoom";
import ClubLayout from "./components/Layout/ClubLayout";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup/"
              element={
                authCtx.isLoggedIn ? <Navigate to="/" /> : <CreateAccountForm />
              }
            />
            <Route
              path="/login/*"
              element={authCtx.isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
            />
            <Route
              path="/profile/"
              element={
                !authCtx.isLoggedIn ? <Navigate to="/" /> : <ProfilePage />
              }
            />
            <Route path="/page/:clubId/:pageId" element={<ArticleListPage />} />
            <Route
              path="/createarticle/:clubId"
              element={
                authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/updatearticle/:clubId/:articleId"
              element={
                authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/chat/"
              element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ChatPage />}
            />
            <Route
              path="/chat/room/:id"
              element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ChatRoom />}
            />
            {/* <Route
          path="/gallery"
          element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ChatRoom />}
        /> */}
            <Route path="/article/:articleId" element={<ArticleOnePage />} />
            <Route path="/updatecomment/:commentId" element={<UpdateCommentPage />} />
            <Route path="/clubpage/:pageId" element={<ClubListPage />} />
            <Route path="/club/:clubId" element={<ClubOnePage />} />
            <Route path="/clubpage/:pageId" element={<ClubListPage />} />
            <Route path="/club/:clubId" element={<ClubOnePage />} />
            <Route
              path="createclub"
              element={
                authCtx.isLoggedIn ? <CreateClubPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/updateclub/:clubId"
              element={
                authCtx.isLoggedIn ? <UpdateClubPage /> : <Navigate to="/" />
              }
            />

            <Route path="/moim" element={<ClubLayout />}>
              <Route path="" element={<Test1 />} />
              <Route path="chat" element={<Test2 />}>
                <Route path="" element={<ChatPage />} />
              </Route>
              <Route path="articlearticle" element={<Test3 />} />
            </Route>
          </Routes>
        </Layout>
      </UserProvider>
    </AuthContextProvider>
  );
}

export default App;
