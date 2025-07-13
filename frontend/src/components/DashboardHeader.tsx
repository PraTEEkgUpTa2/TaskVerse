import { Bell, ChevronDown, Search, User } from "lucide-react";
import { useTheme } from "./theme-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface User {
  name: string;
  email?: string;
}

export function DashboardHeader() {
    const { setTheme } = useTheme();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    const auth = useAuth();
    if (!auth) return null; // or loading spinner
    const { user, loading } = auth;

    

  // Mock search results - in real app, this would come from your data
    const searchResults = [
    { type: "task", title: "Complete project proposal", category: "Work" },
    { type: "task", title: "Review design mockups", category: "Design" },
    { type: "habit", title: "Morning meditation", category: "Health" },
    { type: "habit", title: "Read for 30 minutes", category: "Learning" },
    { type: "focus", title: "Deep work session", category: "Productivity" },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="hidden md:flex relative">
            <Button
                variant="outline"
                className="w-64 justify-start text-muted-foreground bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search tasks, habits...
              </Button>
            </div>
            
            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
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
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{(user?.name ?? "Guest").charAt(0).toUpperCase() + (user?.name ?? "Guest").slice(1)}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.level}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{(user?.name ?? "Guest").charAt(0).toUpperCase() + (user?.name ?? "Guest").slice(1)}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem  className="text-red-600 dark:text-red-400">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>

    {/* Search Command Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput 
          placeholder="Search tasks, habits, focus sessions..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tasks">
            {searchResults
              .filter(item => item.type === "task")
              .map((item, index) => (
                <CommandItem key={`task-${index}`} className="cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{item.category}</span>
                  </div>
                </CommandItem>
              ))
            }
          </CommandGroup>
          <CommandGroup heading="Habits">
            {searchResults
              .filter(item => item.type === "habit")
              .map((item, index) => (
                <CommandItem key={`habit-${index}`} className="cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{item.category}</span>
                  </div>
                </CommandItem>
              ))
            }
          </CommandGroup>
          <CommandGroup heading="Focus Sessions">
            {searchResults
              .filter(item => item.type === "focus")
              .map((item, index) => (
                <CommandItem key={`focus-${index}`} className="cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{item.category}</span>
                  </div>
                </CommandItem>
              ))
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
