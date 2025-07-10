import { ThemeProvider } from "@/components/theme-provider";
import { LandingPage } from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import TaskManagement from "./pages/TaskManagement";
import Subscription from "./pages/Subscription";
import HabitTracker from "./pages/HabitTracker";
import FocusMode from "./pages/FocusMode";
import Gamification from "./pages/Gamification";
import Settings from "./pages/Settings";
import Referral from "./pages/Referal";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="taskverse-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/dashboard/*" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/tasks" element={<TaskManagement />} />
                      <Route path="/habits" element={<HabitTracker />} />
                      <Route path="/focus" element={<FocusMode />} />
                      <Route path="/gamification" element={<Gamification />} />
                      <Route path="/referral" element={<Referral />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
              </SidebarProvider>
            } />
        </Routes>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;