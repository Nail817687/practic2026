import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
import AdminPage from "./pages/AdminPage";
import PageTransition from "./components/PageTransition";
import ForbiddenPage from "./pages/ForbiddenPage";
import MainPage from "./pages/MainPage";
import Statistics from "./pages/Statistics";
import StudentsList from "./pages/StudentsList";
import Performance from "./pages/Performance";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";

function App() {
  let { user, setUser, setLoading } = useContext(AuthContext);

  useEffect(() => {
    let savedUser = localStorage.getItem("user");
    if (!user.isLogged) {
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setLoading(false);
      }
    }
  }, []);

  function reloadeUser() {
    let savedUser = JSON.parse(localStorage.getItem("user"));
    if (!user.isLogged) {
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }

  useEffect(() => {
    if (user.isLogged) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route element={<PageTransition />}>
            <Route
              path="/"
              element={user.isLogged ? <MainPage /> : <HomePage />}
            />

            <Route element={<RequireAuth />}>
              <Route path="/students" element={<StudentsList />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />

            <Route element={<RequireRole role="Admin" />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route element={<RequireRole role="Teacher" />}>
              <Route path="/performance" element={<Performance />} />
              <Route path="/statistics" element={<Statistics />} />
            </Route>

            <Route path="/performance" element={<Performance />} />
            <Route path="/statistics" element={<Statistics />} />

            <Route path="forbidden" element={<ForbiddenPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
