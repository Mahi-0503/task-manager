const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    dashboardStats,
    getRecentTasks
} = require("../controllers/taskController");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    createTask
);

router.get(
    "/",
    authMiddleware,
    getTasks
);
router.get(
  "/dashboard/stats",
  authMiddleware,
  dashboardStats
);
router.get(
  "/dashboard/recent",
  authMiddleware,
  getRecentTasks
);
router.get(
    "/:id",
    authMiddleware,
    getTask
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    updateTask
);
router.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware("Admin"),
    updateTaskStatus
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    deleteTask
);

module.exports = router;