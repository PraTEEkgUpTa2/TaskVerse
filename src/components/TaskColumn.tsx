import React from "react";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/pages/TaskManagement";

interface TaskColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  onDrop: (status: Task["status"]) => void;
  isDraggedOver: boolean;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onDeleteTask,
  onEditTask,
  onDragStart,
  onDragEnd,
  onDrop,
  isDraggedOver
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(status);
  };

  const getColumnAccent = () => {
    switch (status) {
      case "todo":
        return "from-blue-50/80 to-blue-100/40 border-blue-200/50 dark:from-blue-900/20 dark:to-blue-800/10 dark:border-blue-800/30";
      case "inprogress":
        return "from-yellow-50/80 to-yellow-100/40 border-yellow-200/50 dark:from-yellow-900/20 dark:to-yellow-800/10 dark:border-yellow-800/30";
      case "completed":
        return "from-green-50/80 to-green-100/40 border-green-200/50 dark:from-green-900/20 dark:to-green-800/10 dark:border-green-800/30";
      default:
        return "from-slate-50/80 to-slate-100/40 border-slate-200/50 dark:from-slate-800/20 dark:to-slate-700/10 dark:border-slate-700/30";
    }
  };

  return (
    <div
      className={`bg-gradient-to-b ${getColumnAccent()} backdrop-blur-sm rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
        isDraggedOver 
          ? "border-blue-400 dark:border-blue-500 bg-gradient-to-b from-blue-50/90 to-blue-100/60 dark:from-blue-900/30 dark:to-blue-800/20 scale-[1.02] shadow-lg" 
          : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Enhanced Column Header */}
      <div className="p-5 border-b border-slate-200/30 dark:border-slate-700/30 bg-white/60 dark:bg-slate-800/40 rounded-t-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="text-xl">{title.split(' ')[0]}</span>
            <span>{title.split(' ').slice(1).join(' ')}</span>
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full font-medium shadow-sm border border-slate-200/50 dark:border-slate-600/50">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Tasks Container */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)] custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500">
            <div className="text-6xl mb-4 opacity-50">
              {status === "todo" ? "📝" : status === "inprogress" ? "🚧" : "✅"}
            </div>
            <p className="text-sm font-medium">No tasks yet</p>
            <p className="text-xs opacity-75 mt-1">
              {status === "todo" ? "Add a new task to get started" : 
               status === "inprogress" ? "Move tasks here when you start working" : 
               "Completed tasks will appear here"}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
};
