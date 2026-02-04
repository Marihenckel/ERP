import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 text-slate-100 min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-8">ERP</h1>

      <nav className="space-y-4">
        <Link to="/" className="block hover:text-blue-400">Dashboard</Link>
        <Link to="/pedidos" className="block hover:text-blue-400">Pedidos</Link>
        <Link to="/produtos" className="block hover:text-blue-400">Produtos</Link>
        <Link to="/relatorios" className="block hover:text-blue-400">Relatórios</Link>
      </nav>
    </aside>
  )
}