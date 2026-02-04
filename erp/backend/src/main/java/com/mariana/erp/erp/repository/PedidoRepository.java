package com.mariana.erp.erp.repository;

import com.mariana.erp.erp.domain.Pedido;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import com.mariana.erp.erp.domain.StatusPedido;
import com.mariana.erp.erp.dto.FaturamentoDiarioDTO;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT COUNT(p) FROM Pedido p")
    Long totalPedidos();

    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.status = :status")
    Long pedidosPagos(@Param("status") StatusPedido status);

    @Query("SELECT COALESCE(SUM(p.total), 0) FROM Pedido p WHERE p.status = :status")
    Double faturamentoTotal(@Param("status") StatusPedido status);

    @Query(
  "SELECT new com.mariana.erp.erp.dto.FaturamentoDiarioDTO(" +
  " DATE(p.dataHora), " +
  " COALESCE(SUM(p.total), 0) " +
  ") " +
  "FROM Pedido p " +
  "WHERE p.status = 'PAGO' " +
  "GROUP BY DATE(p.dataHora) " +
  "ORDER BY DATE(p.dataHora)"
)
List<FaturamentoDiarioDTO> faturamentoDiario();
}

