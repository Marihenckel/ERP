import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.heroCard}>
          <div style={styles.kicker}>ERP</div>
          <h1 style={styles.title}>Painel inicial</h1>
          <p style={styles.subtitle}>
            Acesso rápido às áreas do sistema. Tudo com a mesma identidade visual.
          </p>

          <div style={styles.ctaRow}>
            <Link to="/dashboard" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Abrir Dashboard
            </Link>
            <Link to="/produtos" style={{ ...styles.btn, ...styles.btnGhost }}>
              Gerenciar Produtos
            </Link>
          </div>
        </div>

        <div style={styles.tiles}>
          <Link to="/produtos" style={styles.tile}>
            <div style={styles.tileTitle}>Produtos</div>
            <div style={styles.tileText}>Cadastrar, editar e excluir</div>
          </Link>

          <Link to="/dashboard" style={styles.tile}>
            <div style={styles.tileTitle}>Dashboard</div>
            <div style={styles.tileText}>Indicadores e gráficos</div>
          </Link>

          <Link to="/pedidos" style={{ ...styles.tile, ...styles.tileDisabled }}>
            <div style={styles.tileTitle}>Pedidos</div>
            <div style={styles.tileText}>Em breve</div>
          </Link>

          <Link to="/relatorios" style={{ ...styles.tile, ...styles.tileDisabled }}>
            <div style={styles.tileTitle}>Relatórios</div>
            <div style={styles.tileText}>Em breve</div>
          </Link>
        </div>
      </div>
    </div>
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
  page: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${C.navy} 0%, ${C.periwinkle} 55%, ${C.lavender} 100%)`,
    padding: 24,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 16,
  },
  heroCard: {
    background: "rgba(250,251,252,0.92)",
    border: `1px solid rgba(205,206,238,0.9)`,
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 12px 28px rgba(1,51,131,0.25)",
  },
  kicker: { color: C.navy, fontWeight: 900, letterSpacing: 1, fontSize: 12 },
  title: { margin: "6px 0 6px", color: C.navy, fontSize: 30 },
  subtitle: { margin: 0, color: "rgba(1,51,131,0.75)", lineHeight: 1.4 },
  ctaRow: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" },

  btn: {
    textDecoration: "none",
    borderRadius: 14,
    padding: "10px 14px",
    border: `1px solid rgba(1,51,131,0.18)`,
    fontWeight: 900,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: { background: C.navy, color: C.paper, borderColor: C.navy },
  btnGhost: { background: "white", color: C.navy },

  tiles: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  tile: {
    textDecoration: "none",
    background: "rgba(250,251,252,0.92)",
    border: `1px solid rgba(205,206,238,0.9)`,
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 10px 22px rgba(1,51,131,0.18)",
    transition: "transform 0.15s ease",
    color: C.navy,
  },
  tileTitle: { fontWeight: 950, fontSize: 16 },
  tileText: { marginTop: 6, opacity: 0.75 },
  tileDisabled: { opacity: 0.55, pointerEvents: "none" },
};
