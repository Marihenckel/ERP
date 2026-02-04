import api from "../services/api";


export const evolucaoMensal = (inicio, fim) =>
  api.get('/dashboard/evolucao-mensal/periodo', {
    params: { inicio, fim }
  });

export const rankingProdutos = (inicio, fim) =>
  api.get('/dashboard/ranking-produtos/periodo', {
    params: { inicio, fim }
  });

export const ticketMedio = (inicio, fim) =>
  api.get('/dashboard/ticket-medio/periodo', {
    params: { inicio, fim }
  });
