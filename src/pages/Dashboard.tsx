import { useState, useEffect } from "react";

type User = {
  firstName: string;
  lastName?: string;
  email?: string;
  
};

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser || { name: "Guest" });
      } else {
          setUser({ firstName: "Guest" });
      }
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Welcome to your dashboard! {user?.firstName + " " + user?.lastName} Here you can manage your tasks, projects, and more.</p>
        
      </div>
    </div>
  );
}