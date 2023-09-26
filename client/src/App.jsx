import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import { AuthProvider, useAuth } from "./context/auth";
import Spaces from "./pages/Spaces";
import { Private } from "./privateroute/Private";
import React from "react";
import Dashboard from "./user/Dashboard";
import Profile from "./user/Profile";
import Answer from "./user/Answer";
import Followers from "./user/Followers";
import Following from "./user/Following";
import Edits from "./user/Edits";
import Activity from "./user/Activity";
import Question from "./user/Question";
import Post from "./user/Post";

// axios.defaults.baseURL = `https://quora-backend-m4my.onrender.com`;
axios.defaults.baseURL = `http://localhost:8080`;

// https://quora-backend-m4my.onrender.com
function App() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={auth.user ? <Navigate to="/home" /> : <Login />}
            />
            <Route path="/home" element={<Private />}>
              <Route path="" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="/home/spaces" element={<Spaces />} />
                <Route path="/home/dashboard" element={<Dashboard />}>
                  <Route index element={<Profile />} />
                  <Route path="answer" element={<Answer />} />
                  <Route path="question" element={<Question />} />
                  <Route path="post" element={<Post />} />
                  <Route path="followers" element={<Followers />} />
                  <Route path="following" element={<Following />} />
                  <Route path="edits" element={<Edits />} />
                  <Route path="activity" element={<Activity />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
