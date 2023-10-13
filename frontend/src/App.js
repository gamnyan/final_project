import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
import CreateAccountForm from "./components/Auth/CreateAccountForm";
import Layout from "./components/Layout/Layout";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import AuthContext from "./Store/Auth-context";

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
      </Routes>
    </Layout>
  );
}

export default App;
