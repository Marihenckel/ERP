import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

export default function DashboardLayout({ title, children }) {
  return (
    <div style={styles.shell}>
      <Sidebar />

      <div style={styles.main}>
        <Topbar title={title} />
        <main style={styles.content}>{children}</main>
      </div>
    </div>
  );
}

// Paleta do seu sistema
const C = {
  navy: "#013383",
  blue: "#1471d8",
  sky: "#85b9f3",
  periwinkle: "#8699eb",
  paper: "#fafbfc",
  lavender: "#cdceee",
};

const styles = {
  shell: {
    minHeight: "100vh",
    display: "flex",
    background: "white",
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: 16,
    background:
      "linear-gradient(180deg, rgba(205,206,238,0.35), rgba(250,251,252,1))",
    color: C.navy,
  },
};
