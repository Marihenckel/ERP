package com.mariana.erp.erp.controller;

import com.mariana.erp.erp.domain.Produto;
import com.mariana.erp.erp.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @SuppressWarnings("null")
    @PostMapping
    public Produto criar(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @GetMapping
    public List<Produto> listar() {
         return produtoRepository.findAll(); 
    }

     @GetMapping("/ping")
    public String ping() {
        return "ok";
}
}