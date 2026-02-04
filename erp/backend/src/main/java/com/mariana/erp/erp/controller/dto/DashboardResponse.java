package com.mariana.erp.erp.controller.dto;

public class DashboardResponse {

    private Double faturamento;
    private Long totalPedidos;
    private Long pedidosPagos;

    public DashboardResponse(Double faturamento, Long totalPedidos, Long pedidosPagos) {
        this.faturamento = faturamento;
        this.totalPedidos = totalPedidos;
        this.pedidosPagos = pedidosPagos;
    }

    public Double getFaturamento() {
        return faturamento;
    }

    public Long getTotalPedidos() {
        return totalPedidos;
    }

    public Long getPedidosPagos() {
        return pedidosPagos;
    }
}
