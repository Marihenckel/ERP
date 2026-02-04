package com.mariana.erp.erp.controller.dto.response;

public class ItemPedidoResponse {

    private Long id;
    private Long produtoId;
    private String produtoNome;
    private Double precoUnitario;
    private Integer quantidade;
    private Double subtotal;

    public ItemPedidoResponse(
            Long id,
            Long produtoId,
            String produtoNome,
            Double precoUnitario,
            Integer quantidade,
            Double subtotal
    ) {
        this.id = id;
        this.produtoId = produtoId;
        this.produtoNome = produtoNome;
        this.precoUnitario = precoUnitario;
        this.quantidade = quantidade;
        this.subtotal = subtotal;
    }

    public Long getId() { return id; }
    public Long getProdutoId() { return produtoId; }
    public String getProdutoNome() { return produtoNome; }
    public Double getPrecoUnitario() { return precoUnitario; }
    public Integer getQuantidade() { return quantidade; }
    public Double getSubtotal() { return subtotal; }
}
