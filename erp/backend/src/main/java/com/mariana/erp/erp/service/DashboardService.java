package com.mariana.erp.erp.service;

import org.springframework.stereotype.Service;

import com.mariana.erp.erp.controller.dto.DashboardResponse;
import com.mariana.erp.erp.domain.StatusPedido;
import com.mariana.erp.erp.repository.PedidoRepository;

@Service
public class DashboardService {

    private final PedidoRepository pedidoRepository;

    public DashboardService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public DashboardResponse carregarDashboard() {
        return new DashboardResponse(
            pedidoRepository.faturamentoTotal(StatusPedido.PAGO),
            pedidoRepository.totalPedidos(),
            pedidoRepository.pedidosPagos(StatusPedido.PAGO)
        );
    }
}
