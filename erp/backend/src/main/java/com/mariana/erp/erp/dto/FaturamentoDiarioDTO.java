package com.mariana.erp.erp.dto;

import java.sql.Date;

public record FaturamentoDiarioDTO(
        Date data,
        Double total) {
}
