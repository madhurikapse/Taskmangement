import mongoose, { model, Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: [{ type: String, required: true }],
    duedate : { type: String, required: true } ,
    status: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User1' }
});

const Task = model("Task", taskSchema);

export default Task;