package com.mariana.erp.erp.repository;

import com.mariana.erp.erp.domain.Pedido;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import com.mariana.erp.erp.domain.StatusPedido;
import com.mariana.erp.erp.dto.DashboardResumoDTO;
import com.mariana.erp.erp.dto.EvolucaoMensalDTO;
import com.mariana.erp.erp.dto.FaturamentoDiarioDTO;
import com.mariana.erp.erp.dto.FaturamentoMensalDTO;
import com.mariana.erp.erp.dto.PedidosPorCanalDTO;
import com.mariana.erp.erp.dto.TicketMedioDTO;

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

@Query("""
        SELECT new com.mariana.erp.erp.dto.FaturamentoMensalDTO(
            YEAR(p.dataHora),
            MONTH(p.dataHora),
            SUM(p.total)
        )
        FROM Pedido p
        WHERE p.status = 'FINALIZADO'
        GROUP BY YEAR(p.dataHora), MONTH(p.dataHora)
        ORDER BY YEAR(p.dataHora), MONTH(p.dataHora)
    """)
    List<FaturamentoMensalDTO> faturamentoMensal();

    @Query("""
        SELECT new com.mariana.erp.erp.dto.PedidosPorCanalDTO(
            p.canal,
            COUNT(p)
        )
        FROM Pedido p
        GROUP BY p.canal
    """)
    List<PedidosPorCanalDTO> pedidosPorCanal();

    @Query("""
        SELECT new com.mariana.erp.erp.dto.DashboardResumoDTO(
            COUNT(p),
            COALESCE(SUM(p.total), 0),
            COALESCE(AVG(p.total), 0)
        )
        FROM Pedido p
        WHERE p.status = 'FINALIZADO'
    """)
    DashboardResumoDTO resumoDashboard();

    @Query("""
    SELECT new com.mariana.erp.erp.dto.FaturamentoDiarioDTO(
        CAST(p.dataHora AS date),
        SUM(p.total)
    )
    FROM Pedido p
    WHERE p.status = 'FINALIZADO'
      AND p.dataHora BETWEEN :inicio AND :fim
    GROUP BY CAST(p.dataHora AS date)
    ORDER BY CAST(p.dataHora AS date)
""")
List<FaturamentoDiarioDTO> faturamentoDiarioPorPeriodo(
    @Param("inicio") LocalDateTime inicio,
    @Param("fim") LocalDateTime fim
);

@Query("""
    SELECT new com.mariana.erp.erp.dto.FaturamentoMensalDTO(
        YEAR(p.dataHora),
        MONTH(p.dataHora),
        SUM(p.total)
    )
    FROM Pedido p
    WHERE p.status = 'FINALIZADO'
      AND p.dataHora BETWEEN :inicio AND :fim
    GROUP BY YEAR(p.dataHora), MONTH(p.dataHora)
    ORDER BY YEAR(p.dataHora), MONTH(p.dataHora)
""")
List<FaturamentoMensalDTO> faturamentoMensalPorPeriodo(
    @Param("inicio") LocalDateTime inicio,
    @Param("fim") LocalDateTime fim
);

@Query("""
    SELECT new com.mariana.erp.erp.dto.TicketMedioDTO(
        COALESCE(AVG(p.total), 0)
    )
    FROM Pedido p
    WHERE p.status = 'FINALIZADO'
      AND p.dataHora BETWEEN :inicio AND :fim
""")
TicketMedioDTO ticketMedioPorPeriodo(
    @Param("inicio") LocalDateTime inicio,
    @Param("fim") LocalDateTime fim
);

@Query("""
    SELECT new com.mariana.erp.erp.dto.EvolucaoMensalDTO(
        YEAR(p.dataHora),
        MONTH(p.dataHora),
        SUM(p.total)
    )
    FROM Pedido p
    WHERE p.status = 'FINALIZADO'
      AND p.dataHora BETWEEN :inicio AND :fim
    GROUP BY YEAR(p.dataHora), MONTH(p.dataHora)
    ORDER BY YEAR(p.dataHora), MONTH(p.dataHora)
""")
List<EvolucaoMensalDTO> evolucaoMensal(
    @Param("inicio") LocalDateTime inicio,
    @Param("fim") LocalDateTime fim
);
}

