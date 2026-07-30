import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import {
  FiFolder,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCalendar,
} from "react-icons/fi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/projects",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjects(res.data);
  };

  const addProject = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/projects",
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setName("");
    setDescription("");

    fetchProjects();
  };

  const updateProject = async () => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/projects/${editingId}`,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditingId(null);
    setName("");
    setDescription("");

    fetchProjects();
  };

  const deleteProject = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProjects();
  };

  return (
    <Layout>
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Projects</h2>
          <p className="text-muted">
            Manage all your projects in one place.
          </p>
        </div>
      </div>

      {/* Form */}

      <div
        className="card border-0 shadow-sm mb-5"
        style={{ borderRadius: "20px" }}
      >
        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            {editingId ? "Edit Project" : "Create New Project"}
          </h5>

          <input
            className="form-control mb-3"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ borderRadius: "12px" }}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ borderRadius: "12px" }}
          />

          <button
            className={`btn ${
              editingId
                ? "btn-warning"
                : "btn-primary"
            }`}
            onClick={
              editingId
                ? updateProject
                : addProject
            }
            style={{
              borderRadius: "12px",
              padding: "10px 22px",
            }}
          >
            <FiPlus className="me-2" />

            {editingId
              ? "Update Project"
              : "Add Project"}
          </button>

        </div>
      </div>

      {/* Cards */}

      {projects.length === 0 ? (
        <div
          className="card border-0 shadow-sm text-center p-5"
          style={{ borderRadius: "20px" }}
        >
          <FiFolder
            size={60}
            className="text-primary mb-3 mx-auto"
          />

          <h4>No Projects Yet</h4>

          <p className="text-muted">
            Create your first project to
            start managing your work.
          </p>
        </div>
      ) : (
        <div className="row">

          {projects.map((project) => (

            <div
              className="col-md-6 col-lg-4 mb-4"
              key={project.id}
            >

              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "20px",
                  transition: ".3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between">

                    <div
                      className="rounded-3 p-3 mb-3"
                      style={{
                        background: "#E8F0FE",
                      }}
                    >
                      <FiFolder
                        size={28}
                        color="#2563EB"
                      />
                    </div>

                    <span className="text-muted">
                      #{project.id}
                    </span>

                  </div>

                  <h4 className="fw-bold">
                    {project.name}
                  </h4>

                  <p
                    className="text-muted"
                    style={{
                      minHeight: "60px",
                    }}
                  >
                    {project.description}
                  </p>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center">

                    <small className="text-muted">
                      <FiCalendar className="me-1" />
                      Active Project
                    </small>

                    <div>

                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => {
                          setEditingId(project.id);
                          setName(project.name);
                          setDescription(
                            project.description
                          );
                        }}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          deleteProject(project.id)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}
    </Layout>
  );
}

export default Projects;