import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiUserPlus,
  FiCheckCircle,
} from "react-icons/fi";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/signup", form);

    toast.success(res.data.message || "Account Created Successfully 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Signup Failed"
    );
  }
};

  return (
  <div
    className="container-fluid vh-100 d-flex align-items-center justify-content-center"
    style={{ background: "#F4F7FE" }}
  >
    <div
      className="row shadow-lg overflow-hidden"
      style={{
        width: "1000px",
        borderRadius: "25px",
        background: "#fff",
      }}
    >
      {/* Left Panel */}

      <div
        className="col-lg-5 d-none d-lg-flex flex-column justify-content-center text-white p-5"
        style={{
          background:
            "linear-gradient(135deg,#2563EB,#1D4ED8)",
        }}
      >
        <div
          className="mb-4 rounded-4 d-flex align-items-center justify-content-center"
          style={{
            width: "95px",
            height: "95px",
            background: "rgba(255,255,255,.12)",
          }}
        >
          <h1 className="fw-bold">T</h1>
        </div>

        <h1 className="fw-bold mb-3">
          Task Manager
        </h1>

        <p className="fs-5 opacity-75">
          Join today and organize your
          projects, tasks and productivity
          with ease.
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

      <div className="col-lg-7 p-5">

        <h1 className="fw-bold">
          Create Account 🎉
        </h1>

        <p className="text-muted mb-4">
          Create your account to start
          managing your workspace.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <label className="fw-semibold">
            Full Name
          </label>

          <div className="input-group mb-3">

            <span className="input-group-text">
              <FiUser />
            </span>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}

          <label className="fw-semibold">
            Email Address
          </label>

          <div className="input-group mb-3">

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

          {/* Password */}

          <label className="fw-semibold">
            Password
          </label>

          <div className="input-group mb-3">

            <span className="input-group-text">
              <FiLock />
            </span>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              className="form-control"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword
                ? <FiEyeOff />
                : <FiEye />}
            </button>

          </div>

          {/* Role */}

          <label className="fw-semibold">
            Role
          </label>

          <div className="input-group mb-4">

            <span className="input-group-text">
              <FiShield />
            </span>

            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="Member">
                Member
              </option>

              <option value="Admin">
                Admin
              </option>

            </select>

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3"
          >
            <FiUserPlus className="me-2" />
            Create Account
          </button>

        </form>

        <hr className="my-4" />

        <p className="text-center">

          Already have an account?

          <Link
            to="/login"
            className="ms-2 fw-bold text-decoration-none"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  </div>
)};
export default Signup;