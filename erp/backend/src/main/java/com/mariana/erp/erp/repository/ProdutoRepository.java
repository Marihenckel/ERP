package com.mariana.erp.erp.repository;

import com.mariana.erp.erp.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
