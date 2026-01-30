package Entidades;

import java.time.LocalDateTime;

import Entidades.EnunLista.CanalVenda;
import Entidades.EnunLista.StatusPedido;

import java.math.BigDecimal;

public class Pedidos {

    private Long id;
    private String numero;
    private LocalDateTime dataHora;
    private StatusPedido status; // Supondo que você tenha um enum de Status
    private CanalVenda canal;
    private BigDecimal total;
    private Long clienteId;

    // Construtor padrão
    public Pedidos() {
    }

    // Construtor completo
    public Pedidos(Long id, String numero, LocalDateTime dataHora, CanalVenda canal, BigDecimal total, Long clienteId) {
        this.id = id;
        this.numero = numero;
        this.dataHora = dataHora;
        this.canal = canal;
        this.total = total;
        this.clienteId = clienteId;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNumero() {
        return numero;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public LocalDateTime getDataHora() {
        return dataHora;
    }
    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
    public CanalVenda getCanal() {
        return canal;
    }
    public void setCanal(CanalVenda canal) {
        this.canal = canal;
    }
    public BigDecimal getTotal() {
        return total;
    }
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    public Long getClienteId() {
        return clienteId;
    }
    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
    
}