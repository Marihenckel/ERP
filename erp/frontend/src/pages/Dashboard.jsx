import DashboardCard from "../components/DashboardCard" 

export default function Dashboard({ data }) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Visão Geral
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Pedidos Hoje"
          value={data.totalPedidos}
        />
        <DashboardCard
          title="Pedidos Pagos"
          value={data.pedidosPagos}
        />
        <DashboardCard
          title="Faturamento"
          value={`R$ ${data.faturamento.toFixed(2)}`}
        />
      </div>
    </div>
  );
}
