import { ThemeProvider } from "@/components/theme-provider";
import { LandingPage } from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="taskverse-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/tasks" element={<Dashboard />} />
                      <Route path="/habits" element={<Dashboard />} />
                      <Route path="/focus" element={<Dashboard />} />
                      <Route path="/gamification" element={<Dashboard />} />
                      <Route path="/analytics" element={<Dashboard />} />
                      <Route path="/settings" element={<Dashboard />} />
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