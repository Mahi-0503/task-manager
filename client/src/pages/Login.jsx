import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiCheckCircle,
} from "react-icons/fi";
import API from "../api/axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful 🎉");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#f4f7fe",
      }}
    >
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-lg-10">

          <div
            className="card border-0 shadow-lg overflow-hidden"
            style={{ borderRadius: "24px" }}
          >
            <div className="row g-0">

              {/* Left Panel */}

              <div
                className="col-md-5 text-white d-flex flex-column justify-content-center p-5"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#4f46e5)",
                }}
              >
                <div
                  className="mb-4 d-flex justify-content-center align-items-center"
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,.15)",
                    fontSize: "42px",
                    fontWeight: "700",
                  }}
                >
                  T
                </div>

                <h1 className="fw-bold">
                  Task Manager
                </h1>

                <p className="mt-3 fs-5">
                  Organize your projects,
                  manage tasks and boost
                  your productivity.
                </p>

                <div className="mt-4">

                  <p>
                    <FiCheckCircle className="me-2" />
                    Manage Projects Easily
                  </p>

                  <p>
                    <FiCheckCircle className="me-2" />
                    Track Task Progress
                  </p>

                  <p>
                    <FiCheckCircle className="me-2" />
                    Beautiful Dashboard
                  </p>

                </div>

              </div>

              {/* Right Panel */}

              <div className="col-md-7 p-5">

                <h2 className="fw-bold">
                  Welcome Back 👋
                </h2>

                <p className="text-muted mb-4">
                  Login to continue managing
                  your workspace.
                </p>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        <FiMail />
                      </span>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        <FiLock />
                      </span>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <button
                    className="btn btn-primary w-100 py-2"
                    style={{
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >
                    <FiLogIn className="me-2" />
                    Login
                  </button>

                </form>

                <hr className="my-4" />

                <p className="text-center">

                  Don't have an account?

                  <Link
                    to="/signup"
                    className="ms-2 fw-bold text-decoration-none"
                  >
                    Create Account
                  </Link>

                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;