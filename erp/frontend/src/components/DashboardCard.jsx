export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-zinc-800 rounded-2xl p-6 shadow-md">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}
if (!data) {
  return (
    <div className="p-8 text-zinc-400">
      Carregando dashboard...
    </div>
  );
}