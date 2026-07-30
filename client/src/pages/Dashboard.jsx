import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";

import {
  FiClipboard,
  FiClock,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";

import {
  Pie,
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/dashboard/stats");

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) {
    return (
      <Layout>
        <div className="text-center mt-5">
          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3 text-muted">
            Loading dashboard...
          </p>
        </div>
      </Layout>
    );
  }

  const completion =
    Number(stats.total_tasks) > 0
      ? Math.round(
          (Number(stats.done) /
            Number(stats.total_tasks)) *
            100
        )
      : 0;

  const pieData = {
    labels: [
      "Todo",
      "In Progress",
      "Done",
    ],

    datasets: [
      {
        data: [
          Number(stats.todo),
          Number(stats.in_progress),
          Number(stats.done),
        ],

        backgroundColor: [
          "#fbbf24",
          "#fb923c",
          "#22c55e",
        ],

        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: [
      "Low",
      "Medium",
      "High",
    ],

    datasets: [
      {
        label: "Tasks",

        data: [
          Number(stats.low),
          Number(stats.medium),
          Number(stats.high),
        ],

        backgroundColor: [
          "#38bdf8",
          "#fbbf24",
          "#ef4444",
        ],

        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Layout>
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Dashboard
          </h2>

          <p className="text-muted mb-0">
            Welcome back! Here's an overview
            of your workspace.
          </p>
        </div>

        <div className="text-end">
          <small className="text-muted">
            Completion
          </small>

          <h3 className="fw-bold text-primary">
            {completion}%
          </h3>
        </div>

      </div>

      {/* Cards */}

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Total Tasks"
            value={stats.total_tasks}
            color="#2563eb"
            icon={<FiClipboard />}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Todo"
            value={stats.todo}
            color="#f59e0b"
            icon={<FiClock />}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="In Progress"
            value={stats.in_progress}
            color="#f97316"
            icon={<FiActivity />}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Completed"
            value={stats.done}
            color="#22c55e"
            icon={<FiCheckCircle />}
          />
        </div>

      </div>

      {/* Progress */}

      <div
        className="card shadow-sm border-0 mt-4"
        style={{
          borderRadius: "18px",
        }}
      >
        <div className="card-body">

          <h5 className="fw-bold">
            Project Completion
          </h5>

          <p className="text-muted">
            {stats.done} of {stats.total_tasks} tasks completed
          </p>

          <div
            className="progress"
            style={{
              height: "18px",
              borderRadius: "20px",
            }}
          >
            <div
              className={`progress-bar ${
                completion < 30
                  ? "bg-danger"
                  : completion < 70
                  ? "bg-warning"
                  : "bg-success"
              }`}
              style={{
                width: `${completion}%`,
              }}
            >
              {completion}%
            </div>
          </div>

        </div>
      </div>

      {/* Charts */}

      <div className="row mt-4 g-4">

        {/* Pie */}

        <div className="col-lg-6">

          <div
            className="card shadow-sm border-0"
            style={{
              borderRadius: "18px",
              height: "430px",
            }}
          >
            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Task Status
              </h5>

              {Number(stats.total_tasks) === 0 ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "300px",
                    color: "#6c757d",
                    fontSize: "18px",
                  }}
                >
                  No task data available
                </div>
              ) : (
                <div
                  style={{
                    height: "300px",
                  }}
                >
                  <Pie
                    data={pieData}
                    options={chartOptions}
                  />
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Bar */}

        <div className="col-lg-6">

          <div
            className="card shadow-sm border-0"
            style={{
              borderRadius: "18px",
              height: "430px",
            }}
          >
            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Priority Distribution
              </h5>

              {Number(stats.total_tasks) === 0 ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "300px",
                    color: "#6c757d",
                    fontSize: "18px",
                  }}
                >
                  No task data available
                </div>
              ) : (
                <div
                  style={{
                    height: "300px",
                  }}
                >
                  <Bar
                    data={barData}
                    options={chartOptions}
                  />
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;