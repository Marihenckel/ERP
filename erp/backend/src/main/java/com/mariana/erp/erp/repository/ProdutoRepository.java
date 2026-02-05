package com.mariana.erp.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mariana.erp.erp.domain.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> { }
