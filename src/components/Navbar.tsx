import { useState } from "react";
import { Menu, X, Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"><img alt="TaskVerse logo" src="https://i.ibb.co/F4JFprqJ/logo-1-removebg-preview.png" /></span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">TaskVerse</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                How it Works
              </a>
              <a href="/subscription" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Pricing
              </a>
              
              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-600 dark:text-gray-300">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="text-gray-900 dark:text-gray-100">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="text-gray-900 dark:text-gray-100">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="text-gray-900 dark:text-gray-100">
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => {
                console.log("Navigating...");
                navigate('/login');
              }}>
                Login
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl" onClick={() => {
                console.log("Navigating...");
                navigate('/signup');
              }}>
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button - Fixed visibility */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-900 dark:text-gray-100">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="text-gray-900 dark:text-gray-100">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="text-gray-900 dark:text-gray-100">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="text-gray-900 dark:text-gray-100">
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Hamburger Menu - Enhanced visibility */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 w-9 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                  How it Works
                </a>
                <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2">
                  Pricing
                </a>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" className="text-gray-600 dark:text-gray-300" onClick={() => {
                    console.log("Navigating...");
                    navigate('/login');
                  }}>
                    Login
                  </Button>
                  <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={() => {
                    console.log("Navigating...");
                    navigate('/signup');
                    }} >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}