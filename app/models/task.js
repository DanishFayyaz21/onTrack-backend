import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    taskDetails: {
        type: String,
        // required: true,
    },
    qty: {
        type: String,
        // required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    address: String,
    city: String,
    state: String,
    zipCode: String,
    destinationNote: String,
    reciptionNote: String,
    contact: {
        phoneNumber: String,
        email: String,
    },

    time: {
        completeAfter: Date,
        completeBefore: Date,
        serviceTime: String,
    },
    // team: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Team',
    //     required: true,
    // },
    status: {
        type: String,
        enum: ["Assigned", 'Complete', 'Pending', "Failed"],
        default: "Assigned"
        // required: true,
    },

});

const Task = mongoose.model('Task', taskSchema);

export default Task;