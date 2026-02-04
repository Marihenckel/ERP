package com.mariana.erp.erp.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.mariana.erp.erp.controller.dto.response.ItemPedidoResponse;
import com.mariana.erp.erp.controller.dto.response.PedidoResponse;
import com.mariana.erp.erp.domain.ItemPedido;
import com.mariana.erp.erp.domain.Pedido;

public class PedidoMapper {

    public static PedidoResponse toResponse(Pedido pedido) {
        return new PedidoResponse(
                pedido.getId(),
                pedido.getDataHora(),
                pedido.getStatus().name(),
                pedido.getTotal(),
                toItemResponse(pedido.getItens())
        );
    }

    private static List<ItemPedidoResponse> toItemResponse(List<ItemPedido> itens) {
        return itens.stream()
                .map(item -> new ItemPedidoResponse(
                        item.getId(),
                        item.getProduto().getId(),
                        item.getProduto().getNome(),
                        item.getPrecoUnitario(),
                        item.getQuantidade(),
                        item.getSubtotal()
                ))
                .collect(Collectors.toList());
    }
}

