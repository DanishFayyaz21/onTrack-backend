import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamUser',
    },
    // team: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Team',
    //     required: true,
    // },
    status: {
        type: String,
        enum: ['complete', 'important', 'delete'],
        required: true,
    },
    dueDate: {
        type: Date,
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;