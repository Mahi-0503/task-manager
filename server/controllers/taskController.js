const { createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus : updateTaskStatusModel,
    getDashboardStats,
    getRecentTasks
 } = require("../models/taskModel");

exports.createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            due_date,
            project_id,
            assigned_to
        } = req.body;

        if (!title || !project_id) {
            return res.status(400).json({
                message: "Title and Project are required."
            });
        }

        const task = await createTask(
            title,
            description,
            priority,
            status,
            project_id,
            req.user.id
        );

        res.status(201).json({
            message: "Task Created Successfully",
            task
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
exports.getTasks = async (req, res) => {

    const tasks = await getTasks(req.user.id);

    res.json(tasks);

};
exports.getTask = async (req, res) => {

    const task = await getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);

};
exports.dashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats(req.user.id);
    res.json(stats);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.getRecentTasks = async (req, res) => {
  try {
    const tasks = await getRecentTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            priority,
            due_date,
            project_id,
            status
        } = req.body;

        const task = await updateTask(
            id,
            title,
            description,
            priority,
            due_date,
            project_id,
            status
        );

        res.json(task);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
exports.updateTaskStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const task = await updateTaskStatusModel(id, status);

        res.json(task);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};
exports.deleteTask = async (req, res) => {

     try {
    await deleteTask(req.params.id);

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }

};