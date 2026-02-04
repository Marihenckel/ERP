package com.mariana.erp.erp.controller.dto;
import jakarta.validation.constraints.NotNull;
import com.mariana.erp.erp.domain.FormaPagamento;


public class PagamentoRequest {
  
    @NotNull
    private FormaPagamento formaPagamento;

    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }
    public void setFormaPagamento(FormaPagamento formaPagamento) {
        this.formaPagamento = formaPagamento;
    }
    
}
