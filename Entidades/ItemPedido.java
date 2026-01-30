package Entidades;

public class ItemPedido {

    private Long id;
    private Long produtoID;
    private String nomeProduto;
    private int quantidade; 
    private Double precoUnitario;
    private Double subTotal;
    
    // Construtor padrão
    public ItemPedido() {
    }
    // Construtor completo
    public ItemPedido(Long id, Long produtoID, String nomeProduto, int quantidade, Double precoUnitario, Double subTotal) {
        this.id = id;
        this.produtoID = produtoID;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.subTotal = subTotal;
    }   

    // Getters e Setters
    public Long getId() {
        return id;
    }   
    public void setId(Long id) {
        this.id = id;
    }
    public Long getProdutoID() {
        return produtoID;
    }
    public void setProdutoID(Long produtoID) {
        this.produtoID = produtoID;
    }
    public String getNomeProduto() {
        return nomeProduto;
    }
    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    public Double getPrecoUnitario() {
        return precoUnitario;
    }
    public void setPrecoUnitario(Double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
    public Double getSubTotal() {
        return subTotal;
    }
    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }
    
}
