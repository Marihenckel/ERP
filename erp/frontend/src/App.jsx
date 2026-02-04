import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"

import Dashboard from "./pages/Dashboard"
import Pedidos from "./pages/Pedidos"
import Produtos from "./pages/Produtos"
import Relatorios from "./pages/Relatorios"

export default function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-900 min-h-screen text-white">
        <Topbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}