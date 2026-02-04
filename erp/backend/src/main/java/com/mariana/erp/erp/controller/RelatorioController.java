package com.mariana.erp.erp.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mariana.erp.erp.controller.dto.RelatorioVendasResponse;
import com.mariana.erp.erp.service.RelatorioService;



@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

private final RelatorioService relatorioService;

public RelatorioController(RelatorioService relatorioService) {
    this.relatorioService = relatorioService;
}

@GetMapping("/vendas/periodo")
public List<RelatorioVendasResponse> relatorioPorPeriodo(
    @RequestParam LocalDateTime inicio,
    @RequestParam LocalDateTime fim){

    return relatorioService.relatorioVendasPorPeriodo(inicio, fim);
    
   
}
}
