package com.mariana.erp.erp.repository;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mariana.erp.erp.domain.Pagamento;
import com.mariana.erp.erp.controller.dto.RelatorioVendasResponse;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    @Query("""
    SELECT new com.mariana.erp.erp.controller.dto.RelatorioVendasResponse(
        p.formaPagamento,
        SUM(p.valor),
        COUNT(p.id)
    )
    FROM Pagamento p
    WHERE p.pedido.dataHora BETWEEN :inicio AND :fim
    GROUP BY p.formaPagamento
""")
List<RelatorioVendasResponse> relatorioVendasPorPeriodo(
        LocalDateTime inicio,
        LocalDateTime fim
);
}
