import { Habit } from "@/pages/HabitTracker";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddHabitModalProps {
  onClose: () => void;
  onAddHabit: (habit: Omit<Habit, "_id" | "streak" | "completedDates" | "xp" | "longestStreak" | "createdAt">) => void;
  isOpen: boolean;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose, onAddHabit, isOpen }) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tag.trim()) return;

    const newHabit: Omit<Habit, "_id" | "streak" | "completedDates" | "xp" | "longestStreak" | "createdAt"> = {
      title: title.trim(),
      tag: tag.trim(),
    };

    onAddHabit(newHabit);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setTag("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="title">Habit Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter task title..."
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add Habit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};