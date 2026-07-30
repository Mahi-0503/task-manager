function DashboardCard({ title, value, color }) {
  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        transition: "0.3s",
      }}
    >
      {/* Top Colored Line */}
      <div
        style={{
          height: "6px",
          background: color,
        }}
      ></div>

      <div className="card-body p-4">
        <div
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <p
              className="text-muted mb-2"
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              {title}
            </p>

            <h1
              style={{
                color: color,
                fontWeight: "700",
                fontSize: "42px",
                margin: 0,
              }}
            >
              {value}
            </h1>
          </div>

          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "16px",
              background: color,
              opacity: 0.12,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;