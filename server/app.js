const express = require("express");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;
app.get("/api/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route",
        user: req.user
    });

});
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});