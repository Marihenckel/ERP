package com.mariana.erp.erp.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mariana.erp.erp.dto.DashboardResumoDTO;
import com.mariana.erp.erp.dto.EvolucaoMensalDTO;
import com.mariana.erp.erp.dto.FaturamentoDiarioDTO;
import com.mariana.erp.erp.dto.FaturamentoMensalDTO;
import com.mariana.erp.erp.dto.PedidosPorCanalDTO;
import com.mariana.erp.erp.dto.RankingProdutoDTO;
import com.mariana.erp.erp.dto.TicketMedioDTO;
import com.mariana.erp.erp.repository.ItemPedidoRepository;
import com.mariana.erp.erp.repository.PedidoRepository;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    public DashboardController(PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    @GetMapping("/faturamento-diario")
    public List<FaturamentoDiarioDTO> faturamentoDiario() {
        return pedidoRepository.faturamentoDiario();
    }

    @GetMapping("/faturamento-mensal")
    public List<FaturamentoMensalDTO> faturamentoMensal() {
        return pedidoRepository.faturamentoMensal();
    }

    @GetMapping("/pedidos-por-canal")
    public List<PedidosPorCanalDTO> pedidosPorCanal() {
        return pedidoRepository.pedidosPorCanal();
    }

    @GetMapping("/resumo")
    public DashboardResumoDTO resumo() {
        return pedidoRepository.resumoDashboard();
    }

    @GetMapping("/faturamento-diario/periodo")
    public List<FaturamentoDiarioDTO> faturamentoDiarioPorPeriodo(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {
        return pedidoRepository.faturamentoDiarioPorPeriodo(
                inicio.atStartOfDay(),
                fim.atTime(23, 59, 59));
    }

    @GetMapping("/faturamento-mensal/periodo")
    public List<FaturamentoMensalDTO> faturamentoMensalPorPeriodo(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {
        return pedidoRepository.faturamentoMensalPorPeriodo(
                inicio.atStartOfDay(),
                fim.atTime(23, 59, 59));
    }

    @GetMapping("/ticket-medio/periodo")
    public TicketMedioDTO ticketMedioPorPeriodo(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {
        return pedidoRepository.ticketMedioPorPeriodo(
                inicio.atStartOfDay(),
                fim.atTime(23, 59, 59));
    }

    @GetMapping("/ranking-produtos/periodo")
    public List<RankingProdutoDTO> rankingProdutos(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {
        return itemPedidoRepository.rankingProdutos(
                inicio.atStartOfDay(),
                fim.atTime(23, 59, 59));
    }

    @GetMapping("/evolucao-mensal/periodo")
    public List<EvolucaoMensalDTO> evolucaoMensal(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim) {
        return pedidoRepository.evolucaoMensal(
                inicio.atStartOfDay(),
                fim.atTime(23, 59, 59));
    }

    @GetMapping("/teste")
    public String teste() {
        return "OK";
    }
}
