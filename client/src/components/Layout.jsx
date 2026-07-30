import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="container-fluid p-0">
        <div className="row g-0">

          <div className="col-md-2">
    <Sidebar />
</div>

<div
    className="col-md-10 p-4"
    style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "35px",
    }}
>
    {children}
</div>

        </div>
      </div>
    </>
  );
}

export default Layout;