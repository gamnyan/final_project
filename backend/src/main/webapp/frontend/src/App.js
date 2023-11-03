import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
import CreateAccountForm from "./components/Auth/CreateAccountForm";
import Layout from "./components/Layout/Layout";
import Test1 from "./components/club/Test1";
import Test2 from "./components/club/Test2";
import Test3 from "./components/club/Test3";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/home/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import AuthContext from "./Store/Auth-context";
import ChatPage from "./Pages/chatting/ChatPage";
import ArticleListPage from "./Pages/ArticleListPage";
import ArticleOnePage from "./Pages/ArticleOnePage";
import CreateArticlePage from "./Pages/CreateArticlePage";
import UpdateArticlePage from "./Pages/UpdateArticlePage";
import "./css/reset.css";
import "./css/style.css";
import ChatRoom from "./Pages/chatting/ChatRoom";
import ClubLayout from "./components/Layout/ClubLayout";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    // <div className="App">
    //    <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //          Edit <code>src/App.tsx</code> and save to reload.
    //       </p>
    //       <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //          Learn React
    //       </a>
    //    </header>
    // </div>
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
          element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ProfilePage />}
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
        <Route path="/page/:pageId" element={<ArticleListPage />} />
        <Route
          path="/create"
          element={
            authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:articleId"
          element={
            authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to="/" />
          }
        />
        <Route path="/article/:articleId" element={<ArticleOnePage />} />

        <Route path="/moim" element={<ClubLayout />}>
          <Route path="" element={<Test1 />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="articlearticle" element={<Test3 />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
