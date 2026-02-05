import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout.jsx";

import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../api/produtos";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: "", preco: "", descricao: "" });
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [carregandoLista, setCarregandoLista] = useState(true);

  const [busca, setBusca] = useState("");
  const [msg, setMsg] = useState(null); // { type: "success"|"error", text: string }

  async function carregar() {
    setCarregandoLista(true);
    try {
      const res = await listarProdutos();
      setProdutos(res.data || []);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Falha ao carregar produtos." });
    } finally {
      setCarregandoLista(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const produtosFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return produtos;

    return produtos.filter((p) => {
      const nome = (p.nome ?? "").toLowerCase();
      const desc = (p.descricao ?? "").toLowerCase();
      return nome.includes(q) || desc.includes(q);
    });
  }, [produtos, busca]);

  const totalItens = produtosFiltrados.length;

  const mediaPreco = useMemo(() => {
    if (produtosFiltrados.length === 0) return 0;
    const soma = produtosFiltrados.reduce(
      (acc, p) => acc + Number(p.preco || 0),
      0
    );
    return soma / produtosFiltrados.length;
  }, [produtosFiltrados]);

  function iniciarEdicao(p) {
    setEditId(p.id);
    setForm({
      nome: p.nome ?? "",
      preco: String(p.preco ?? ""),
      descricao: p.descricao ?? "",
    });
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function limparForm() {
    setEditId(null);
    setForm({ nome: "", preco: "", descricao: "" });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const precoNumber = Number(String(form.preco).replace(",", "."));

      if (!form.nome.trim()) {
        setMsg({ type: "error", text: "Nome é obrigatório." });
        return;
      }
      if (!Number.isFinite(precoNumber) || precoNumber <= 0) {
        setMsg({ type: "error", text: "Preço inválido. Ex: 29.90" });
        return;
      }

      const payload = {
        nome: form.nome.trim(),
        preco: precoNumber,
        descricao: form.descricao?.trim() || null,
      };

      if (editId) {
        await atualizarProduto(editId, payload);
        setMsg({ type: "success", text: "Produto atualizado com sucesso!" });
      } else {
        await criarProduto(payload);
        setMsg({ type: "success", text: "Produto criado com sucesso!" });
      }

      limparForm();
      await carregar();
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      setMsg({ type: "error", text: "Erro ao salvar. Veja o console (F12)." });
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Deletar este produto?")) return;
    try {
      await deletarProduto(id);
      if (editId === id) limparForm();
      setMsg({ type: "success", text: "Produto excluído." });
      await carregar();
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Erro ao excluir produto." });
    }
  }

  return (
    <DashboardLayout title="Produtos">
      <div style={styles.page}>
        {/* Header interno */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Produtos</h1>
            <div style={styles.subtitle}>
              Cadastre, edite e gerencie seus produtos
            </div>
          </div>

          <div style={styles.stats}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Itens</div>
              <div style={styles.statValue}>{totalItens}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Preço médio</div>
              <div style={styles.statValue}>R$ {mediaPreco.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              {editId ? "Editar produto" : "Novo produto"}
            </div>

            {editId ? (
              <button
                type="button"
                onClick={limparForm}
                disabled={loading}
                style={{ ...styles.btn, ...styles.btnGhost }}
              >
                Cancelar edição
              </button>
            ) : null}
          </div>

          {msg ? (
            <div
              style={{
                ...styles.alert,
                ...(msg.type === "success"
                  ? styles.alertSuccess
                  : styles.alertError),
              }}
            >
              {msg.text}
            </div>
          ) : null}

          <form onSubmit={onSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.field}>
                <label style={styles.label}>Nome</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Molho bolonhesa"
                  value={form.nome}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nome: e.target.value }))
                  }
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Preço (R$)</label>
                <input
                  style={styles.input}
                  placeholder="Ex: 29.90"
                  value={form.preco}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, preco: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Descrição</label>
              <textarea
                style={styles.textarea}
                placeholder="Detalhes do produto (opcional)"
                value={form.descricao}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descricao: e.target.value }))
                }
              />
            </div>

            <div style={styles.formActions}>
              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.btn, ...styles.btnPrimary }}
              >
                {loading
                  ? "Salvando..."
                  : editId
                  ? "Salvar edição"
                  : "Adicionar produto"}
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Lista de produtos</div>

            <input
              style={styles.search}
              placeholder="Buscar por nome ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.th}>Descrição</th>
                  <th style={{ ...styles.th, textAlign: "right" }}>Preço</th>
                  <th style={{ ...styles.th, width: 220, textAlign: "right" }}>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {carregandoLista ? (
                  <tr>
                    <td style={styles.td} colSpan={4}>
                      Carregando...
                    </td>
                  </tr>
                ) : produtosFiltrados.length === 0 ? (
                  <tr>
                    <td style={styles.td} colSpan={4}>
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  produtosFiltrados.map((p) => (
                    <tr key={p.id}>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 900 }}>{p.nome}</div>
                        <div style={styles.miniMuted}>ID #{p.id}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.descCell}>{p.descricao || "-"}</div>
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          textAlign: "right",
                          fontWeight: 900,
                        }}
                      >
                        R$ {Number(p.preco).toFixed(2)}
                      </td>
                      <td style={{ ...styles.td, textAlign: "right" }}>
                        <div style={styles.actions}>
                          <button
                            type="button"
                            onClick={() => iniciarEdicao(p)}
                            style={{ ...styles.btn, ...styles.btnGhost }}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(p.id)}
                            style={{ ...styles.btn, ...styles.btnDanger }}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.footerNote}>
          Dica: como você está com H2 em arquivo, os produtos continuam após
          reiniciar o backend.
        </div>
      </div>
    </DashboardLayout>
  );
}

// Paleta do seu sistema (igual no layout)
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
    maxWidth: 1100,
    margin: "0 auto",
    padding: 4,
    color: C.navy,
  },

  header: {
    display: "flex",
    gap: 16,
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  title: { margin: 0, fontSize: 22, fontWeight: 950, color: C.navy },
  subtitle: { marginTop: 6, color: "rgba(1,51,131,0.7)", fontSize: 13 },

  stats: { display: "flex", gap: 12, flexWrap: "wrap" },
  statCard: {
    background: "rgba(250,251,252,0.92)",
    border: `1px solid rgba(205,206,238,0.9)`,
    borderRadius: 14,
    padding: "10px 14px",
    minWidth: 140,
    boxShadow: "0 8px 18px rgba(1,51,131,0.10)",
  },
  statLabel: { fontSize: 12, color: "rgba(1,51,131,0.65)", fontWeight: 800 },
  statValue: { fontSize: 18, fontWeight: 950, marginTop: 2 },

  card: {
    background: "rgba(250,251,252,0.92)",
    border: `1px solid rgba(205,206,238,0.9)`,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0 10px 22px rgba(1,51,131,0.10)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  cardTitle: { fontWeight: 950, fontSize: 15, color: C.navy },

  alert: {
    padding: 10,
    borderRadius: 14,
    marginBottom: 12,
    fontSize: 14,
    border: "1px solid transparent",
    fontWeight: 700,
  },
  alertSuccess: {
    background: "rgba(133,185,243,0.25)",
    borderColor: "rgba(20,113,216,0.25)",
    color: C.navy,
  },
  alertError: {
    background: "rgba(239,68,68,0.10)",
    borderColor: "rgba(239,68,68,0.18)",
    color: "#991b1b",
  },

  form: { display: "grid", gap: 12 },
  formRow: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 },
  field: { display: "grid", gap: 6 },
  label: { fontSize: 12, color: "rgba(1,51,131,0.65)", fontWeight: 900 },
  input: {
    border: "1px solid rgba(1,51,131,0.18)",
    borderRadius: 14,
    padding: "10px 12px",
    outline: "none",
    fontSize: 14,
    background: C.paper,
  },
  textarea: {
    border: "1px solid rgba(1,51,131,0.18)",
    borderRadius: 14,
    padding: "10px 12px",
    outline: "none",
    fontSize: 14,
    minHeight: 90,
    resize: "vertical",
    background: C.paper,
  },
  formActions: { display: "flex", justifyContent: "flex-end" },

  btn: {
    borderRadius: 14,
    padding: "10px 12px",
    border: "1px solid rgba(1,51,131,0.18)",
    background: C.paper,
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 14,
    color: C.navy,
  },
  btnPrimary: { background: C.navy, color: C.paper, borderColor: C.navy },
  btnGhost: { background: "white" },
  btnDanger: {
    background: "rgba(239,68,68,0.12)",
    borderColor: "rgba(239,68,68,0.20)",
    color: "#991b1b",
  },

  search: {
    border: "1px solid rgba(1,51,131,0.18)",
    borderRadius: 14,
    padding: "10px 12px",
    minWidth: 280,
    outline: "none",
    fontSize: 14,
    background: C.paper,
  },

  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: 12,
    color: "rgba(1,51,131,0.65)",
    borderBottom: "1px solid rgba(1,51,131,0.12)",
    padding: "10px 8px",
    fontWeight: 950,
  },
  td: {
    borderBottom: "1px solid rgba(1,51,131,0.08)",
    padding: "12px 8px",
    verticalAlign: "top",
  },
  miniMuted: { fontSize: 12, color: "rgba(1,51,131,0.6)", marginTop: 3 },
  descCell: { color: "rgba(1,51,131,0.85)" },
  actions: { display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" },

  footerNote: { color: "rgba(1,51,131,0.65)", fontSize: 12, marginTop: 6 },
};
