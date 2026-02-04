import { useEffect, useState } from "react";
import { evolucaoMensal, rankingProdutos } from "../api/dashboard";
import React from "react";

export default function Dashboard() {
  const [evolucao, setEvolucao] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    evolucaoMensal("2025-01-01", "2026-12-31")
      .then(res => setEvolucao(res.data));

    rankingProdutos("2025-01-01", "2026-12-31")
      .then(res => setRanking(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Evolução Mensal</h2>
      <pre>{JSON.stringify(evolucao, null, 2)}</pre>

      <h2>Ranking de Produtos</h2>
      <pre>{JSON.stringify(ranking, null, 2)}</pre>
    </div>
  );
}
