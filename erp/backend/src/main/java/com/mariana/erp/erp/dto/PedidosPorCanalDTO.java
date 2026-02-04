package com.mariana.erp.erp.dto;

import com.mariana.erp.erp.domain.CanalPedido;

public record PedidosPorCanalDTO(
    CanalPedido canal,
    Long quantidade
) {}
