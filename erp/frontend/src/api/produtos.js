import api from "../services/api";

export const listarProdutos = () => api.get("/produtos");

export const criarProduto = (produto) => api.post("/produtos", produto);

export const atualizarProduto = (id, produto) => api.put(`/produtos/${id}`, produto);

export const deletarProduto = (id) => api.delete(`/produtos/${id}`);

