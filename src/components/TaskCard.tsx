import React, { useState } from "react";
import { Calendar, Edit, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/pages/TaskManagement";
import { EditTaskModal } from "@/components/EditTaskModal";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnd
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-300 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 dark:from-yellow-900/30 dark:to-yellow-800/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-300 border-green-200 dark:border-green-800";
      default:
        return "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && task.status !== "completed";
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Card
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        className="group cursor-move hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
      >
        <CardContent className="p-5">
          {/* Drag Handle and Title */}
          <div className="flex items-start space-x-3 mb-4">
            <GripVertical className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {task.title}
              </h4>
            </div>
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {task.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-medium bg-slate-100/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors px-2 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Priority and Due Date */}
          <div className="flex items-center justify-between mb-4">
            <Badge
              className={`text-xs font-bold px-3 py-1 border ${getPriorityColor(task.priority)}`}
            >
              {task.priority.toUpperCase()}
            </Badge>

            {task.dueDate && (
              <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-md ${
                isOverdue(task.dueDate) 
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                  : "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800"
              }`}>
                <Calendar className="h-3 w-3" />
                <span className="font-medium">{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onEditTask={onEdit}
      />
    </>
  );
};
