package com.mariana.erp.erp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mariana.erp.erp.controller.dto.RelatorioVendasResponse;
import com.mariana.erp.erp.repository.PagamentoRepository;

@Service
public class RelatorioService {

private final PagamentoRepository pagamentoRepository;

public RelatorioService(PagamentoRepository pagamentoRepository) {
    this.pagamentoRepository = pagamentoRepository;
}
    public List<RelatorioVendasResponse> relatorioVendasPorPeriodo(
        LocalDateTime inicio,
        LocalDateTime fim) {

    if (inicio.isAfter(fim)) {
        throw new RuntimeException("Data inicial não pode ser maior que a final");
    }

    return pagamentoRepository.relatorioVendasPorPeriodo(inicio, fim);
}
}
