
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import QuestRoom from "./pages/QuestRoom";
import QuestFeed from "./pages/QuestFeed";
import Journal from "./pages/Journal";
import AdminQuest from "./pages/AdminQuest";
import HighlightWall from "./pages/HighlightWall";
import GamificationBar from "./components/GamificationBar";
import MoodCheck from "./components/MoodCheck";
import { GamificationProvider } from "./context/GamificationContext";
import { ExamModeProvider } from "./context/ExamModeContext";

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === 'true';
    return isAuthenticated ? (
      <>
        <GamificationBar />
        <MoodCheck />
        {children}
      </>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GamificationProvider>
        <ExamModeProvider>
          <Router>
            <Routes>
              <Route
                path="/quests"
                element={
                  <PrivateRoute>
                    <QuestFeed />
                  </PrivateRoute>
                }
              />
              <Route
                path="/quest/:id"
                element={
                  <PrivateRoute>
                    <QuestRoom />
                  </PrivateRoute>
                }
              />
              <Route
                path="/journal"
                element={
                  <PrivateRoute>
                    <Journal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/highlights"
                element={
                  <PrivateRoute>
                    <HighlightWall />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminQuest />
                  </PrivateRoute>
                }
              />

              {/* Redirects or other routes */}
              <Route path="/" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </ExamModeProvider>
      </GamificationProvider>
    </ThemeProvider >
  );
}

export default App;
