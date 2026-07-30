import { useState, useEffect } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiClipboard,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await API.get("/projects");

    setProjects(res.data);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");

    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/tasks/${editingId}`, {
        title,
        description,
        priority,
        due_date: dueDate,
        project_id: projectId,
      });
    } else {
      await API.post("/tasks", {
        title,
        description,
        priority,
        due_date: dueDate,
        project_id: projectId,
      });
    }

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setProjectId("");
    setEditingId(null);

    fetchTasks();
  };

  const editTask = (task) => {
    setEditingId(task.id);

    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.due_date?.substring(0, 10));
    setProjectId(task.project_id);
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/tasks/${id}`);

    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}/status`, {
      status,
    });

    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "" ||
      task.status === statusFilter;

    const matchPriority =
      priorityFilter === "" ||
      task.priority === priorityFilter;

    return (
      matchSearch &&
      matchStatus &&
      matchPriority
    );
  });

  const total = tasks.length;

  const todo = tasks.filter(
    (t) => t.status === "Todo"
  ).length;

  const progress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const done = tasks.filter(
    (t) => t.status === "Done"
  ).length;

  const priorityBadge = (priority) => {
    if (priority === "High")
      return "bg-danger";

    if (priority === "Medium")
      return "bg-warning text-dark";

    return "bg-success";
  };

  const statusBadge = (status) => {
    if (status === "Done")
      return "bg-success";

    if (status === "In Progress")
      return "bg-warning text-dark";

    return "bg-secondary";
  };
  return (
  <Layout>
    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 className="fw-bold mb-1">
          Task Management
        </h2>

        <p className="text-muted">
          Create, organize and manage your daily tasks.
        </p>
      </div>

      <button
        className="btn btn-primary px-4"
        onClick={() =>
          window.scrollTo({
          top: 250,
          behavior: "smooth",
           })}
        style={{
          borderRadius: "12px",
        }}
      >
        <FiPlus className="me-2" />
        New Task
      </button>

    </div>

    {/* Statistics */}

    <div className="row mb-4">

      <div className="col-md-3">
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "18px" }}
        >
          <div className="card-body">

            <FiClipboard
              size={35}
              color="#2563EB"
            />

            <h2 className="mt-3 fw-bold">
              {total}
            </h2>

            <p className="text-muted">
              Total Tasks
            </p>

          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "18px" }}
        >
          <div className="card-body">

            <FiClock
              size={35}
              color="#F59E0B"
            />

            <h2 className="mt-3 fw-bold">
              {todo}
            </h2>

            <p className="text-muted">
              Todo
            </p>

          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "18px" }}
        >
          <div className="card-body">

            <FiClock
              size={35}
              color="#F97316"
            />

            <h2 className="mt-3 fw-bold">
              {progress}
            </h2>

            <p className="text-muted">
              In Progress
            </p>

          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "18px" }}
        >
          <div className="card-body">

            <FiCheckCircle
              size={35}
              color="#22C55E"
            />

            <h2 className="mt-3 fw-bold">
              {done}
            </h2>

            <p className="text-muted">
              Completed
            </p>

          </div>
        </div>
      </div>

    </div>

    {/* Task Form */}

    <div
      className="card border-0 shadow-sm mb-4"
      style={{
        borderRadius: "18px",
      }}
    >
      <div className="card-body">

        <h5 className="fw-bold mb-4">
          {editingId
            ? "Update Task"
            : "Create Task"}
        </h5>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <input
                className="form-control"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                style={{
                  borderRadius: "12px",
                }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                value={projectId}
                onChange={(e) =>
                  setProjectId(e.target.value)
                }
                style={{
                  borderRadius: "12px",
                }}
              >
                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))}

              </select>
            </div>

            <div className="col-md-12 mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                style={{
                  borderRadius: "12px",
                }}
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-3">

              <button
                className="btn btn-primary w-100"
                style={{
                  height: "100%",
                  borderRadius: "12px",
                }}
              >
                {editingId
                  ? "Update Task"
                  : "Add Task"}
              </button>

            </div>

          </div>

        </form>

      </div>
    </div>

    {/* Search */}

    <div
      className="card border-0 shadow-sm mb-4"
      style={{
        borderRadius: "18px",
      }}
    >
      <div className="card-body">

        <div className="row">

          <div className="col-md-4">

            <div className="input-group">

              <span className="input-group-text">
                <FiSearch />
              </span>

              <input
                className="form-control"
                placeholder="Search task..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="">
                All Status
              </option>

              <option>
                Todo
              </option>

              <option>
                In Progress
              </option>

              <option>
                Done
              </option>

            </select>

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(
                  e.target.value
                )
              }
            >
              <option value="">
                All Priority
              </option>

              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>

            </select>

          </div>

        </div>

      </div>
    </div>

    {/* Table */}

    <div
      className="card border-0 shadow-sm"
      style={{
        borderRadius: "18px",
      }}
    >
      <div className="card-body">

        <table className="table table-hover align-middle">

          <thead>

            <tr>

              <th>Task</th>

              <th>Priority</th>

              <th>Status</th>

              <th>Project</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTasks.map((task) => (

              <tr key={task.id}>

                <td>

                  <strong>
                    {task.title}
                  </strong>

                </td>

                <td>

                  <span
                    className={`badge ${priorityBadge(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                </td>

                <td>

                  <select
                    className={`form-select form-select-sm ${statusBadge(
                      task.status
                    )}`}
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(
                        task.id,
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Todo
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Done
                    </option>

                  </select>

                </td>

                <td>
                  {task.project_name}
                </td>

                <td>

                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() =>
                      editTask(task)
                    }
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    <FiTrash2 />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </Layout>
)};
export default Tasks;