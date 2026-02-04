import { useEffect, useState } from "react"
import { listarPedidos } from "../api/pedidos"

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listarPedidos()
      .then(response => {
        setPedidos(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar pedidos", error)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Carregando pedidos...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      <div className="space-y-4">
        {pedidos.map(pedido => (
          <div
            key={pedido.id}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700"
          >
            <p><strong>ID:</strong> {pedido.id}</p>
            <p><strong>Status:</strong> {pedido.status}</p>
            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
