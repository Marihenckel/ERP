import React from "react";

export default function Topbar({ title }) {
  return (
    <div style={styles.bar}>
      <div style={styles.left}>
        <div style={styles.title}>{title}</div>
        <div style={styles.subtitle}>Tudo centralizado, com navegação por rotas</div>
      </div>

      <div style={styles.right}>
        <input style={styles.search} placeholder="Buscar..." />
        <button style={styles.iconBtn} title="Menu">
          ☰
        </button>
      </div>
    </div>
  );
}

const C = {
  navy: "#013383",
  paper: "#fafbfc",
  lavender: "#cdceee",
};

const styles = {
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 18,
    background: "rgba(250,251,252,0.92)",
    border: `1px solid rgba(205,206,238,0.9)`,
    boxShadow: "0 10px 22px rgba(1,51,131,0.12)",
  },
  left: { display: "grid", gap: 4 },
  title: { fontWeight: 950, color: C.navy, fontSize: 16 },
  subtitle: { fontSize: 12, color: "rgba(1,51,131,0.65)" },
  right: { display: "flex", gap: 10, alignItems: "center" },
  search: {
    borderRadius: 14,
    padding: "10px 12px",
    border: "1px solid rgba(1,51,131,0.18)",
    outline: "none",
    minWidth: 220,
    background: C.paper,
  },
  iconBtn: {
    borderRadius: 14,
    padding: "10px 12px",
    border: "1px solid rgba(1,51,131,0.18)",
    background: C.paper,
    cursor: "pointer",
    fontWeight: 900,
  },
};
