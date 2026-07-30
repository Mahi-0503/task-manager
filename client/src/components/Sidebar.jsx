import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: <FiFolder />,
      path: "/projects",
    },
    {
      name: "Tasks",
      icon: <FiCheckSquare />,
      path: "/tasks",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: "#111827",
        minHeight: "100%",
        height: "100%",
        color: "white",
        padding: "25px 18px",
      }}
    >
      {/* Logo */}

      <div className="text-center mb-5">

        <div
          style={{
            width: 70,
            height: 70,
            background: "#2563eb",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          T
        </div>

        <h4 className="mt-3 fw-bold">
          Task Manager
        </h4>

        <small
          style={{
            color: "#9ca3af",
          }}
        >
          Productivity Dashboard
        </small>

      </div>

      {/* Menu */}

      <div>

        {menu.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              textDecoration: "none",
              color:
                location.pathname === item.path
                  ? "#fff"
                  : "#d1d5db",
              background:
                location.pathname === item.path
                  ? "#2563eb"
                  : "transparent",
              padding: "14px 18px",
              borderRadius: "14px",
              marginBottom: "12px",
              transition: "0.3s",
              fontWeight: 500,
            }}
          >
            <span style={{ fontSize: 20 }}>
              {item.icon}
            </span>

            {item.name}
          </Link>

        ))}

      </div>

      {/* Logout */}

      <button
        onClick={logout}
        className="btn btn-danger w-100 mt-5"
        style={{
          borderRadius: "14px",
          padding: "12px",
          fontWeight: 600,
        }}
      >
        <FiLogOut className="me-2" />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;