package com.mariana.erp.erp.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.mariana.erp.erp.controller.dto.AdicionarItemRequest;
import com.mariana.erp.erp.controller.dto.PagamentoRequest;
import com.mariana.erp.erp.controller.dto.response.PedidoResponse;
import com.mariana.erp.erp.domain.Pedido;
import com.mariana.erp.erp.mapper.PedidoMapper;
import com.mariana.erp.erp.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
public PedidoResponse criarPedido() {
    return PedidoMapper.toResponse(pedidoService.criarPedido());
}

    @PostMapping("/{pedidoId}/itens")
public PedidoResponse adicionarItem(
        @PathVariable Long pedidoId,
        @RequestBody @Valid AdicionarItemRequest request) {

    return PedidoMapper.toResponse(
            pedidoService.adicionarItem(
                    pedidoId,
                    request.getProdutoId(),
                    request.getQuantidade()
            )
    );
}

    @PostMapping("/{pedidoId}/fechar")
public PedidoResponse fecharPedido(@PathVariable Long pedidoId) {
    return PedidoMapper.toResponse(pedidoService.fecharPedido(pedidoId));
}

@PostMapping("/{pedidoId}/pagar")
public Pedido pagar(
        @PathVariable Long pedidoId,
        @RequestBody @Valid PagamentoRequest request) {

    return pedidoService.pagarPedido(
            pedidoId,
            request.getFormaPagamento()
    );
}

}

