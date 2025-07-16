import  { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskColumn } from "@/components/TaskColumn";
import { AddTaskModal } from "@/components/AddTaskModal";
import axios from "@/api/axios"

export interface Task {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "completed";
  priority: "low" | "medium" | "high";
  tags: string[];
  dueDate?: string;
  createdAt: string;
}

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/v1/tasks/task");
      console.log("Fetched tasks response:", data); // 👈 log response
      const mappedTasks = data.data.map((task: any) => ({
          ...task,
          id: task._id,
        }));
        setTasks(mappedTasks);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  fetchTasks();
}, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const filterButtons = ["All", "Today", "Upcoming", "Completed"];

  const filteredTasks = (tasks ?? []).filter(task => {
    if (!task || !task.title) return false;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Today") {
      const today = new Date().toISOString().split('T')[0];
      return matchesSearch && task.dueDate === today;
    }
    if (activeFilter === "Upcoming") {
      const today = new Date().toISOString().split('T')[0];
      return matchesSearch && task.dueDate && task.dueDate > today;
    }
    if (activeFilter === "Completed") {
      return matchesSearch && task.status === "completed";
    }
    return matchesSearch;
  });

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleAddTask = async (newTask: Omit<Task, "id" | "createdAt">) => {
     try {
    const { data } = await axios.post("/api/v1/tasks/task", newTask);
    setTasks(prev => [...prev, data.data]); // append task from backend
  } catch (err) {
    console.error("Failed to add task", err);
  }
  };

  const handleDeleteTask = async(taskId: string) => {
    await axios.delete(`/api/v1/tasks/${taskId}`)
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleEditTask = async (updatedTask: Task) => {
    const {data} = await axios.put(`/api/v1/tasks/${updatedTask.id}`, updatedTask)
    const edited = {...data.data, id: data.data._id};
    setTasks(prev => prev.map(task => 
      task.id === edited.id ? edited : task
    ));
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (newStatus: Task["status"]) => {
    if (draggedTask && draggedTask.status !== newStatus) {
      const updatedTask = { ...draggedTask, status: newStatus };
      handleEditTask(updatedTask);
    }
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Header */}
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Task Management 📋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Organize and track your productivity
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64 border-slate-200 dark:border-slate-800"
            />
          </div>
          
          <div className="flex space-x-2">
            {filterButtons.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <TaskColumn
            title="📝 To Do"
            status="todo"
            tasks={getTasksByStatus("todo")}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            isDraggedOver={draggedTask?.status !== "todo"}
          />
          <TaskColumn
            title="🚧 In Progress"
            status="inprogress"
            tasks={getTasksByStatus("inprogress")}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            isDraggedOver={draggedTask?.status !== "inprogress"}
          />
          <TaskColumn
            title="✅ Completed"
            status="completed"
            tasks={getTasksByStatus("completed")}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            isDraggedOver={draggedTask?.status !== "completed"}
          />
        </div>
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        size="lg"
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 z-50 transition-all duration-300 hover:scale-110"
      >
        <Plus className="h-7 w-7 text-white" />
      </Button>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default TaskManagement;
