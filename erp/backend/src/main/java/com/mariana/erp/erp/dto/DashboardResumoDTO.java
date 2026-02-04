package com.mariana.erp.erp.dto;

import java.math.BigDecimal;

public record DashboardResumoDTO(
    Long totalPedidos,
    BigDecimal faturamentoTotal,
    BigDecimal ticketMedio
) {}
