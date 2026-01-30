package com.mariana.erp.erp.service;

import org.springframework.stereotype.Service;

import com.mariana.erp.erp.domain.*;
import com.mariana.erp.erp.repository.PedidoRepository;
import com.mariana.erp.erp.repository.ProdutoRepository;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
   

    public PedidoService(
        PedidoRepository pedidoRepository,
        ProdutoRepository produtoRepository) {

    this.pedidoRepository = pedidoRepository;
    this.produtoRepository = produtoRepository;
}


    public Pedido fecharPedido(Long pedidoId) {

        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (pedido.getStatus() == StatusPedido.FECHADO) {
            throw new RuntimeException("Pedido já está fechado");
        }

        if (pedido.getItens().isEmpty()) {
            throw new RuntimeException("Não é possível fechar um pedido sem itens");
        }

        pedido.setStatus(StatusPedido.FECHADO);
        return pedidoRepository.save(pedido);
    }

    public Pedido criarPedido() {
        Pedido pedido = new Pedido();
        return pedidoRepository.save(pedido);
    }

    public Pedido adicionarItem(Long pedidoId, Long produtoId, Integer quantidade) {

        if (quantidade <= 0) {
            throw new RuntimeException("Quantidade inválida");
        }

        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (!pedido.getStatus().equals(StatusPedido.ABERTO)) {
            throw new RuntimeException("Pedido não está aberto");
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        ItemPedido item = new ItemPedido();
        item.setPedido(pedido);
        item.setProduto(produto);
        item.setQuantidade(quantidade);
        item.setPrecoUnitario(produto.getPreco());

        pedido.getItens().add(item);

        double total = pedido.getItens().stream()
                .mapToDouble(ItemPedido::getSubtotal)
                .sum();

        pedido.setTotal(total);

        return pedidoRepository.save(pedido);
    }
}
