package com.mariana.erp.erp.controller.dto;

import java.math.BigDecimal;

public class RelatorioVendasResponse {

    private Long pedidoId;
    private BigDecimal total;
    private String formaPagamento;

    public RelatorioVendasResponse(Long pedidoId, BigDecimal total, String formaPagamento) {
        this.pedidoId = pedidoId;
        this.total = total;
        this.formaPagamento = formaPagamento;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }
}
