package com.mariana.erp.erp.dto;

import java.time.LocalDate;

public record FaturamentoDiarioDTO(
    LocalDate data,
    Double totalVendas
) {}
