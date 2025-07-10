
import { Habit } from "@/pages/HabitTracker";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddHabitModalProps {
    onClose: () => void;
    onAddHabit: (habit: Omit<Habit, "id" | "streak" | "completedDates" | "completed" | "xpReward">) => void;
    isOpen: boolean;
}

export const AddHabitModal : React.FC<AddHabitModalProps> = ({ onClose, onAddHabit, isOpen }) => {
    
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !category.trim()) return;
        const newHabit: Omit<Habit, "id" | "streak" | "completedDates" | "completed" | "xpReward"> = {
            name: name.trim(),
            category: category.trim(),
        };

        onAddHabit(newHabit);
        handleClose();
    }

    const handleClose = () => {
        setName("");
        setCategory("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Habit</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Habit Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
}