package com.mariana.erp.erp.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.mariana.erp.erp.controller.dto.AdicionarItemRequest;
import com.mariana.erp.erp.domain.Pedido;
import com.mariana.erp.erp.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public Pedido criarPedido() {
        return pedidoService.criarPedido();
    }

    @PostMapping("/{pedidoId}/itens")
    public Pedido adicionarItem(
            @PathVariable Long pedidoId,
            @RequestBody @Valid AdicionarItemRequest request) {

        return pedidoService.adicionarItem(
                pedidoId,
                request.getProdutoId(),
                request.getQuantidade()
        );
    }

    @PostMapping("/{pedidoId}/fechar")
    public Pedido fecharPedido(@PathVariable Long pedidoId) {
        return pedidoService.fecharPedido(pedidoId);
    }
}

