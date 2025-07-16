import mongoose, {Schema, Document} from "mongoose"

interface ITask extends Document {
    title: string,
    priority: "low" | "medium" | "high",
    status: "todo" | "inprogress" | "completed",
    tags: string [],
    dueDate?: Date,
    user: mongoose.Types.ObjectId
}

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    status: {
        type: String,
        enum: ["todo","inprogress","completed"],
        default: "todo"
    },
    tags: {
        type: [String],
        default: []
    },
    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
    {
    timestamps: { createdAt: true, updatedAt: false }
  }
)

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;