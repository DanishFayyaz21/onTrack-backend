
import Task from "../../models/task.js";
import Team from "../../models/team/team.js";

const taskController = {
    // api for create task with status
    async createTask(req, res) {
        const userId = req.user.id
        const { title, description, assignedTo, status, dueDate } = req.body;

        // const TeamExist = await Team.findOne({ createdBy: userId })
        // if (!TeamExist) {
        //     return res.status(404).json({ message: "Team not found" })
        // }
        // validation for status
        if (status !== 'complete' && status !== 'important' && status !== 'delete') {
            return res.status(400).json({
                message: 'status value is not valid'
            })
        }
        Task.create({
            title,
            description,
            assignedTo,
            // team: TeamExist._id,
            status,
            dueDate,
        }).then((response) => {
            res.status(201).json({
                message: 'task created successfully',
                data: { task: response },
            })
        }).catch((error) => {
            res.status(400).json({
                message: 'error creating task',
                error
            })
        })
    },

    async editTask(req, res) {
        const taskId = req.query.taskId;
        if (!taskId) {
            return res.status(400).json({ status: 400, message: "task id is require" })
        }
        const { title, description, assignedTo, status, dueDate } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            { title, description, assignedTo, status, dueDate },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({
                message: 'task not found'
            })
        } else {
            res.status(200).json({
                message: 'task updated successfully',
                data: updatedTask,
            })
        }
    },

    //api for delte task
    async deleteTask(req, res) {
        const taskId = req.params.taskId;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'task not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'task delted successfully',
            data: deletedTask,
        })
    },
    async getAlltasks(req, res) {
        // const userId = req.user.id;
        // const teamExist = await Team.findOne({ createdBy: userId })
        // if (!teamExist) {
        //     return res.status(404).json({ status: 404, message: "Team Not found" })
        // }

        const allTasks = await Task.find()
        if (allTasks.length > 0) {
            res.status(200).json({
                status: 200,
                data: { allTasks }
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No task found"
            })
        }


    },
    async getTaskById(req, res) {
        const taskId = req.params.taskId;
        if (!taskId) {
            return res.status(400).json({ status: 400, message: "Task id require" })
        }

        const task = await Task.findOne({ _id: taskId })
        if (task) {
            res.status(200).json({
                status: 200,
                data: { task }
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Not found"
            })
        }


    }

}

export default taskController;