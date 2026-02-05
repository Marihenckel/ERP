import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Dashboard from "./pages/Dashboard";

function EmBreve({ titulo }) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>{titulo}</h1>
      <p>Em breve 🙂</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />

      <Route path="/pedidos" element={<EmBreve titulo="Pedidos" />} />
      <Route path="/relatorios" element={<EmBreve titulo="Relatórios" />} />
      <Route path="/config" element={<EmBreve titulo="Configurações" />} />

      <Route path="*" element={<EmBreve titulo="Página não encontrada" />} />
    </Routes>
  );
}
