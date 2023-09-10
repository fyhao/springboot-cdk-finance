package com.fyhao.springbootapps.finance.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data  // Generates getters, setters, equals, hashCode, and toString methods.
@NoArgsConstructor  // Generates a no-args constructor.
@AllArgsConstructor  // Generates a constructor for all fields.
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private BigDecimal amount;
    private Date date;
}
