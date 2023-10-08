import express from 'express'
import auth from '../app/http/middlewares/auth.js'
import taskController from '../app/http/controllers/taskController.js';



const router = express.Router();
router.route("/create-task").post(auth, taskController.createTask)
router.route("/edit-task/").put(auth, taskController.editTask)
router.route("/delete-task/:taskId").delete(auth, taskController.deleteTask);
router.route("/get-all-tasks").get(auth, taskController.getAlltasks);
router.route("/get-task/:taskId").get(auth, taskController.getTaskById);

export default router;