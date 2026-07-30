const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    createProject
);

router.get(
    "/",
    authMiddleware,
    getProjects
);

router.get(
    "/:id",
    authMiddleware,
    getProject
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    updateProject
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    deleteProject
);

module.exports = router;