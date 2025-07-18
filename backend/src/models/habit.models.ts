import mongoose, {Schema, Document} from "mongoose";

interface IHabit extends Document{
    user: mongoose.Schema.Types.ObjectId,
    title: string,
    tag: string,
    xp: number,
    streak: number,
    longestStreak: number,
    completedDates: Date[],
    createdAt: Date,
}

const HabitSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    tag: {
        type: String,
        enum: ["Health", "Learning", "Mindfulness", "Work", "Personal", "Other"],
        default: "Other"
    },
    xp: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    completedDates: {
        type: [Date],
        default: []
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
},{
    timestamps: true
});

const Habit = mongoose.model<IHabit>('Habit', HabitSchema);

export default Habit;