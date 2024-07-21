const todo_model = require('../models/todo.model');

exports.createTask = async (req, res) => {
    try {
        const task_body = req.body;
        if (!task_body) {
            return res.status(400).send({
                message: "Task body not present in request"
            });
        }
        const task = await todo_model.create(task_body);
        return res.status(201).send({
            message: "Task created",
            task: task
        });
    } catch (err) {
        console.error("Error while creating task: ", err);
        return res.status(500).send({
            message: "Error while creating task",
            error: err
        });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await todo_model.find();
        if (tasks.length > 0) {
            return res.status(200).send(tasks);
        } else {
            return res.status(404).send({
                error: "No tasks found"
            });
        }
    } catch (err) {
        console.error("Error while fetching tasks: ", err);
        return res.status(500).send({
            error: "Error while fetching tasks",
            errorDetail: err
        });
    }
};

exports.getTaskUsingName = async (req, res) => {
    try {
        const taskName = req.body.name;
        if (!taskName) {
            return res.status(400).send({
                error: "Task name not provided"
            });
        }
        const task_obj = await todo_model.findOne({ task_name: taskName });
        if (task_obj) {
            return res.status(200).send(task_obj);
        } else {
            return res.status(404).send({
                error: "Task not found"
            });
        }
    } catch (err) {
        console.error("Error while fetching task with provided name: ", err);
        return res.status(500).send({
            error: "Error while fetching task with provided name",
            errorDetail: err
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskName = req.body.name;
        const updateData = req.body;
        if (!taskName) {
            return res.status(400).send({
                error: "Task name not provided"
            });
        }
        const updatedTask = await todo_model.findOneAndUpdate({ task_name: taskName }, updateData, { new: true });
        if (updatedTask) {
            return res.status(200).send(updatedTask);
        } else {
            return res.status(404).send({
                error: "Task not found"
            });
        }
    } catch (err) {
        console.error("Error while updating task: ", err);
        return res.status(500).send({
            error: "Error while updating task",
            errorDetail: err
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskName = req.body.name;
        if (!taskName) {
            return res.status(400).send({
                error: "Task name not provided"
            });
        }
        const task_obj = await todo_model.findOneAndDelete({ task_name: taskName });
        if (task_obj) {
            return res.status(200).send({
                message: "Task deleted",
                task: task_obj
            });
        } else {
            return res.status(404).send({
                error: "Task not found"
            });
        }
    } catch (err) {
        console.error("Error while deleting task: ", err);
        return res.status(500).send({
            error: "Error while deleting task",
            errorDetail: err
        });
    }
};

exports.getCompletedTasks=async(req,res)=>{
    try {
        const tasks = await todo_model.find({status: "COMPLETED"});
        if (tasks) {
            return res.status(200).send(tasks);
        } else {
            return res.status(404).send({
                error: "No completed tasks found"
            });
        }
    } catch (err) {
        console.error("Error while fetching completed tasks: ", err);
        return res.status(500).send({
            error: "Error while fetching completed tasks",
            errorDetail: err
        });
    }
}

exports.getPendingTasks=async(req,res)=>{
    try {
        const tasks = await todo_model.find({status: "PENDING"});
        if (tasks) {
            return res.status(200).send(tasks);
        } else {
            return res.status(404).send({
                error: "No pending tasks found"
            });
        }
    } catch (err) {
        console.error("Error while fetching pending tasks: ", err);
        return res.status(500).send({
            error: "Error while fetching pending tasks",
            errorDetail: err
        });
    }
}