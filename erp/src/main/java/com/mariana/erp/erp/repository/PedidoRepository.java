package com.mariana.erp.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mariana.erp.erp.domain.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}

