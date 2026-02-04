import api from "../services/api";

export function listarPedidos() {
  return api.get("/pedidos")}