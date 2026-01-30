package com.mariana.erp.erp.domain;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    private Double total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
private List<ItemPedido> itens = new ArrayList<>();



    @PrePersist
    public void prePersist() {
        this.dataHora = LocalDateTime.now();
        this.status = StatusPedido.ABERTO;
        this.total = 0.0;
    }
    public Pedido() {
    this.status = StatusPedido.ABERTO;
    this.dataHora = LocalDateTime.now();
    this.itens = new ArrayList<>();
}
    // getters e setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDateTime getDataHora() {
        return dataHora;
    }
    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
    public StatusPedido getStatus() {
        return status;
    }
    public void setStatus(StatusPedido status) {
        this.status = status;
    }
    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }
    public List<ItemPedido> getItens() {
        return itens;
    }
    public void setItens(List<ItemPedido> itens) {
        this.itens = itens;
    }

}
