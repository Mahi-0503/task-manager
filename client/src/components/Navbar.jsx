import { FiBell, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e9ecef",
        height: "70px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div className="container-fluid">

        {/* Logo */}
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "#0d6efd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            T
          </div>

          <div className="ms-3">
            <h5 className="mb-0 fw-bold">Task Manager</h5>
            <small className="text-muted">
              Manage your projects efficiently
            </small>
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center">

          <button
            className="btn btn-light me-3 position-relative"
            style={{
              borderRadius: "12px",
              width: "45px",
              height: "45px",
            }}
          >
            <FiBell size={20} />

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              3
            </span>
          </button>

          <div
            className="d-flex align-items-center"
            style={{
              background: "#f8f9fa",
              padding: "8px 15px",
              borderRadius: "14px",
            }}
          >
            <FiUser size={20} className="me-2" />

            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Welcome
              </div>

              <small className="text-muted">
                User
              </small>
            </div>
          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;