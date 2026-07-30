const pool = require("../config/db");

exports.getDashboard = async (req, res) => {

    try {

        const total = await pool.query(
            "SELECT COUNT(*) FROM tasks"
        );

        const completed = await pool.query(
            "SELECT COUNT(*) FROM tasks WHERE status='Done'"
        );

        const pending = await pool.query(
            "SELECT COUNT(*) FROM tasks WHERE status!='Done'"
        );

        const overdue = await pool.query(
            `SELECT COUNT(*)
             FROM tasks
             WHERE due_date < CURRENT_DATE
             AND status!='Done'`
        );

        res.json({
            totalTasks: Number(total.rows[0].count),
            completed: Number(completed.rows[0].count),
            pending: Number(pending.rows[0].count),
            overdue: Number(overdue.rows[0].count)
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};