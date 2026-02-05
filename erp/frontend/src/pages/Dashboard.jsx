import React, { useEffect, useMemo, useState } from "react";
import { evolucaoMensal, rankingProdutos } from "../api/dashboard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [evolucao, setEvolucao] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    evolucaoMensal("2025-01-01", "2026-12-31").then((res) =>
      setEvolucao(res.data || [])
    );

    rankingProdutos("2025-01-01", "2026-12-31").then((res) =>
      setRanking(res.data || [])
    );
  }, []);

  // ✅ Normaliza os dados pra Recharts (ajuste as chaves se necessário)
  const evolucaoChartData = useMemo(() => {
    return (evolucao || []).map((item) => ({
      // tentei cobrir formatos comuns:
      mes: item.mes ?? item.month ?? item.label ?? item.periodo ?? "—",
      valor:
        item.faturamento ??
        item.valor ??
        item.total ??
        item.totalVendas ??
        item.receita ??
        0,
    }));
  }, [evolucao]);

  const rankingChartData = useMemo(() => {
    return (ranking || []).map((item) => ({
      produto: item.produto ?? item.nome ?? item.name ?? "—",
      total:
        item.total ??
        item.quantidade ??
        item.qtd ??
        item.vendas ??
        item.totalVendas ??
        0,
    }));
  }, [ranking]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        {/* Evolução Mensal */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
          <h2 style={{ marginTop: 0 }}>Evolução Mensal</h2>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={evolucaoChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Debug opcional (pode apagar depois) */}
          {/* <pre>{JSON.stringify(evolucao, null, 2)}</pre> */}
        </div>

        {/* Ranking de Produtos */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
          <h2 style={{ marginTop: 0 }}>Ranking de Produtos</h2>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={rankingChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="produto" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Debug opcional (apagar depois) */}
          {/* <pre>{JSON.stringify(ranking, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}
