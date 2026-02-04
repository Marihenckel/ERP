import api from "./api"

export function listarPedidos() {
  return api.get("/pedidos")}