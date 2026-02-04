package com.mariana.erp.erp.controller.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponse {

    private Long id;
    private LocalDateTime dataHora;
    private String status;
    private Double total;
    private List<ItemPedidoResponse> itens;

    public PedidoResponse(
            Long id,
            LocalDateTime dataHora,
            String status,
            Double total,
            List<ItemPedidoResponse> itens
    ) {
        this.id = id;
        this.dataHora = dataHora;
        this.status = status;
        this.total = total;
        this.itens = itens;
    }

    public Long getId() { return id; }
    public LocalDateTime getDataHora() { return dataHora; }
    public String getStatus() { return status; }
    public Double getTotal() { return total; }
    public List<ItemPedidoResponse> getItens() { return itens; }
}
