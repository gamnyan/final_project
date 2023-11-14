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

import ChatPage from "./Pages/chatting/ChatPage";
import ChatRoom from "./Pages/chatting/ChatRoom";
import ClubLayout from "./components/Layout/ClubLayout";

// 갤러리 페이지
import GalleryListPage from "./Pages/gallery/GalleryListPage";
import GalleryOnePage from "./Pages/gallery/GalleryOnePage";
import CreateGalleryPage from "./Pages/gallery/CreateGalleryPage";
import UpdateGalleryPage from "./Pages/gallery/UpdateGalleryPage";
import UpdateGalleryCommentPage from "./Pages/gallery/UpdateGalleryCommentPage";
import ChatOnePage from "./Pages/chatting/ChatOnePage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/:clubId/:pageId" element={<HomePage />} />
            <Route
              path="/signup/"
              element={
                authCtx.isLoggedIn ? (
                  <Navigate to="/1/1" />
                ) : (
                  <CreateAccountForm />
                )
              }
            />
            <Route
              path="/login/*"
              element={
                authCtx.isLoggedIn ? <Navigate to="/1/1" /> : <AuthPage />
              }
            />
            <Route
              path="/profile/"
              element={
                !authCtx.isLoggedIn ? <Navigate to="/1/1" /> : <ProfilePage />
              }
            />

            {/* club */}
            <Route path="/club" element={<ClubLayout />}>
              <Route path="clubpage/:pageId" element={<ClubListPage />} />
              <Route path=":clubId" element={<ClubOnePage />} />
              <Route
                path="createclub"
                element={
                  authCtx.isLoggedIn ? (
                    <CreateClubPage />
                  ) : (
                    <Navigate to="/1/1" />
                  )
                }
              />
              <Route
                path="updateclub/:clubId"
                element={
                  authCtx.isLoggedIn ? (
                    <UpdateClubPage />
                  ) : (
                    <Navigate to="/1/1" />
                  )
                }
              />

              {/* gallery */}
              <Route
                path="createGallery/:clubId"
                element={<CreateGalleryPage />}
              />
              <Route
                path="updateGallery/:clubId/:galleryId"
                element={
                  authCtx.isLoggedIn ? (
                    <UpdateGalleryPage />
                  ) : (
                    <Navigate to="/1/1" />
                  )
                }
              />
              <Route
                path="updategallerycomment/:galleryId/:id"
                element={<UpdateGalleryCommentPage />}
              />
              <Route
                path=":clubId/gallery/page/:pageId"
                element={<GalleryListPage />}
              />
              <Route
                path=":clubId/gallery/:galleryId"
                element={<GalleryOnePage />}
              />

              {/* article */}
              <Route
                path="createarticle/:clubId"
                element={
                  authCtx.isLoggedIn ? (
                    <CreateArticlePage />
                  ) : (
                    <Navigate to="/1/1" />
                  )
                }
              />
              <Route
                path="updatearticle/:clubId/:articleId"
                element={
                  authCtx.isLoggedIn ? (
                    <UpdateArticlePage />
                  ) : (
                    <Navigate to="/1/1" />
                  )
                }
              />
              <Route
                path="updatecomment/:articleId/:commentId"
                element={<UpdateCommentPage />}
              />
              <Route
                path=":clubId/article/page/:pageId"
                element={<ArticleListPage />}
              />
              <Route
                path=":clubId/article/:articleId"
                element={<ArticleOnePage />}
              />

              {/* chat */}
              <Route path=":clubId/chat/:roomId" element={<ChatOnePage />} />
            </Route>
          </Routes>
        </Layout>
      </UserProvider>
    </AuthContextProvider>
  );
}

export default App;
