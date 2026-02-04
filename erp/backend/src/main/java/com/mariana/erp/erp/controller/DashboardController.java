package com.mariana.erp.erp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mariana.erp.erp.dto.FaturamentoDiarioDTO;
import com.mariana.erp.erp.repository.PedidoRepository;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final PedidoRepository pedidoRepository;

    public DashboardController(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/faturamento-diario")
    public List<FaturamentoDiarioDTO> faturamentoDiario() {
        return pedidoRepository.faturamentoDiario();
    }
}