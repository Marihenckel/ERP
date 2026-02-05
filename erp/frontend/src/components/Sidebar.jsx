import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Início" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/produtos", label: "Produtos" },
    { to: "/pedidos", label: "Pedidos (em breve)", disabled: true },
    { to: "/relatorios", label: "Relatórios (em breve)", disabled: true },
    { to: "/config", label: "Config (em breve)", disabled: true },
  ];

  return (
    <aside style={styles.aside}>
      <div style={styles.brand}>
        <div style={styles.logo}>ERP</div>
        <div style={styles.brandText}>Painel</div>
      </div>

      <nav style={styles.nav}>
        {links.map((l) =>
          l.disabled ? (
            <div key={l.to} style={{ ...styles.link, ...styles.disabled }}>
              {l.label}
            </div>
          ) : (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.active : {}),
              })}
            >
              {l.label}
            </NavLink>
          )
        )}
      </nav>

      <div style={styles.footer}>
        <div style={styles.footerTitle}>Paleta</div>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, background: C.navy }} />
          <span style={{ ...styles.dot, background: C.blue }} />
          <span style={{ ...styles.dot, background: C.sky }} />
          <span style={{ ...styles.dot, background: C.periwinkle }} />
          <span style={{ ...styles.dot, background: C.paper, border: "1px solid rgba(1,51,131,0.18)" }} />
          <span style={{ ...styles.dot, background: C.lavender }} />
        </div>
      </div>
    </aside>
  );
}

const C = {
  navy: "#013383",
  blue: "#1471d8",
  sky: "#85b9f3",
  periwinkle: "#8699eb",
  paper: "#fafbfc",
  lavender: "#cdceee",
};

const styles = {
  aside: {
    width: 260,
    background: `linear-gradient(180deg, ${C.navy} 0%, rgba(1,51,131,0.92) 55%, rgba(1,51,131,0.85) 100%)`,
    color: C.paper,
    padding: 16,
    borderRadius: 18,
    boxShadow: "0 18px 40px rgba(1,51,131,0.35)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: `linear-gradient(135deg, ${C.blue} 0%, ${C.sky} 100%)`,
    display: "grid",
    placeItems: "center",
    fontWeight: 950,
    color: C.navy,
  },
  brandText: { fontWeight: 900, letterSpacing: 0.5 },

  nav: { display: "grid", gap: 8, marginTop: 8 },
  link: {
    textDecoration: "none",
    color: C.paper,
    padding: "10px 12px",
    borderRadius: 14,
    fontWeight: 800,
    background: "rgba(250,251,252,0.06)",
    border: "1px solid rgba(250,251,252,0.08)",
  },
  active: {
    background: `linear-gradient(135deg, rgba(20,113,216,0.65) 0%, rgba(133,185,243,0.35) 100%)`,
    border: "1px solid rgba(250,251,252,0.22)",
  },
  disabled: { opacity: 0.45, cursor: "not-allowed" },

  footer: {
    marginTop: "auto",
    background: "rgba(250,251,252,0.08)",
    border: "1px solid rgba(250,251,252,0.10)",
    borderRadius: 14,
    padding: 12,
  },
  footerTitle: { fontSize: 12, opacity: 0.9, fontWeight: 900 },
  dots: { display: "flex", gap: 8, marginTop: 10 },
  dot: { width: 14, height: 14, borderRadius: 999 },
};
