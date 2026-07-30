const pool = require("../config/db");

// Create Project
const createProject = async (name, description, userid) => {
    const result = await pool.query(
        `INSERT INTO projects(name, description, user_id)
         VALUES($1,$2,$3)
         RETURNING *`,
        [name, description, userid]
    );

    return result.rows[0];
};

// Get All Projects
const getAllProjects = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE user_id = $1 ORDER BY id DESC",
        [userId]
    );

    return result.rows;
};

// Get Project by ID
const getProjectById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// Update Project
const updateProject = async (id, name, description) => {
    const result = await pool.query(
        `UPDATE projects
         SET name = $1,
             description = $2
         WHERE id = $3
         RETURNING *`,
        [name, description, id]
    );

    return result.rows[0];
};

// Delete Project
const deleteProject = async (id) => {
    await pool.query(
        "DELETE FROM projects WHERE id = $1",
        [id]
    );
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};