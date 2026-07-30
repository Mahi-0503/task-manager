const pool = require("../config/db");

// Create Task
const createTask = async (
    title,
    description,
    priority,
    status,
    due_date,
    project_id,
    userId
) => {

    const result = await pool.query(
        `INSERT INTO tasks
        (title,description,priority,status,due_date,project_id,user_id)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
            title,
            description,
            priority,
            status,
            due_date,
            project_id,
            userId
        ]
    );

    return result.rows[0];
};

// Get All Tasks
const getTasks = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC",
        [userId]
    );

    return result.rows;
};

// Get Task By ID
const getTaskById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE id=$1",
        [id]
    );

    return result.rows[0];
};

// Update Task
const updateTask = async (
    id,
    title,
    description,
    priority,
    due_date,
    project_id,
    status
) => {

    const result = await pool.query(
        `UPDATE tasks
        SET title=$1,
            description=$2,
            priority=$3,
            due_date=$4,
            project_id=$5,
            status=$6
        WHERE id=$7
        RETURNING *`,
        [
            title,
            description,
            priority,
            due_date,
            project_id,
            status,
            id
        ]
    );

    return result.rows[0];
};
const getDashboardStats = async (userId) => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_tasks,
      COUNT(*) FILTER (WHERE status='Todo') AS todo,
      COUNT(*) FILTER (WHERE status='In Progress') AS in_progress,
      COUNT(*) FILTER (WHERE status='Done') AS done,
      COUNT(*) FILTER (WHERE priority='Low') AS low,
      COUNT(*) FILTER (WHERE priority='Medium') AS medium,
      COUNT(*) FILTER (WHERE priority='High') AS high
    FROM tasks
    WHERE user_id = $1
    `,[userId]);

  return result.rows[0];
};
const getRecentTasks = async (userId) => {
  const result = await pool.query(`
    SELECT
      title,
      status,
      priority,
      due_date
    FROM tasks
    WHERE user_id = $1
    ORDER BY id DESC
    LIMIT 5`,
    [userId]);

  return result.rows;
};

const updateTaskStatus = async (id, status) => {

    const result = await pool.query(
        `
        UPDATE tasks
        SET status=$1
        WHERE id=$2
        RETURNING *
        `,
        [status, id]
    );

    return result.rows[0];
};
// Delete Task
const deleteTask = async (id) => {

    await pool.query(
        "DELETE FROM tasks WHERE id=$1",
        [id]
    );

};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getDashboardStats,
    getRecentTasks
};