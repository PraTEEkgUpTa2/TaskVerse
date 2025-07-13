
import { Home, CheckSquare, Repeat, Timer, Trophy, BarChart, Settings, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";

const sidebarItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Tasks", url: "/dashboard/tasks", icon: CheckSquare },
  { title: "Habits", url: "/dashboard/habits", icon: Repeat },
  { title: "Focus Mode", url: "/dashboard/focus", icon: Timer },
  { title: "Gamification", url: "/dashboard/gamification", icon: Trophy },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Referral", url: "/dashboard/referral", icon: BarChart },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const handleLogout = async () => {
    await axios.post("/api/v1/users/logout");
    navigate("/");
  }


  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarContent className="bg-white dark:bg-slate-900">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"><img alt="TaskVerse logo" src="https://i.ibb.co/F4JFprqJ/logo-1-removebg-preview.png" /></span>
              </div>
            {!collapsed && (
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                TaskVerse
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 dark:text-slate-400 px-6 py-4">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4 space-y-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive(item.url)
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <button className="flex items-center space-x-3 px-4 py-3 w-full text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-200" onClick={() => { handleLogout() }}>
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
