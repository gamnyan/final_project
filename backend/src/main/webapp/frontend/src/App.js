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
import ArticleListPage from './Pages/article/ArticleListPage';
import ArticleOnePage from './Pages/article/ArticleOnePage';
import CreateArticlePage from './Pages/article/CreateArticlePage';
import UpdateArticlePage from './Pages/article/UpdateArticlePage';
import ClubListPage from "./Pages/club/ClubListPage";
import ClubOnePage from "./Pages/club/ClubOnePage";
import "./css/reset.css";
import "./css/style.css";

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
            <Route path="/signup/" element={authCtx.isLoggedIn ?<Navigate to="/" /> : <CreateAccountForm />} />
            <Route path="/login/*" element={authCtx.isLoggedIn ? <Navigate to="/" /> : <AuthPage />} />
            <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ProfilePage />} />
            
            <Route path="/page/:pageId" element={<ArticleListPage />} />
            <Route path="/create" element={authCtx.isLoggedIn ? <CreateArticlePage /> : <Navigate to='/' />} />
            <Route path="/update/:articleId" element={authCtx.isLoggedIn ? <UpdateArticlePage /> : <Navigate to='/' />} />
            <Route path="/article/:articleId" element={<ArticleOnePage />} />
            <Route path="/clubpage/:pageId" element={<ClubListPage />} />
            <Route path="/club/:clubId" element={<ClubOnePage />} />


         </Routes>
      </Layout>
   );
}

export default App;
