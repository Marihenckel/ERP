package com.mariana.erp.erp.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mariana.erp.erp.domain.ItemPedido;
import com.mariana.erp.erp.dto.RankingProdutoDTO;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
    @Query("""
    SELECT new com.mariana.erp.erp.dto.RankingProdutoDTO(
        i.produto.nome,
        SUM(i.quantidade)
    )
    FROM ItemPedido i
    JOIN i.pedido p
    WHERE p.status = 'FINALIZADO'
      AND p.dataHora BETWEEN :inicio AND :fim
    GROUP BY i.produto.nome
    ORDER BY SUM(i.quantidade) DESC
""")
List<RankingProdutoDTO> rankingProdutos(
    @Param("inicio") LocalDateTime inicio,
    @Param("fim") LocalDateTime fim
);
}

