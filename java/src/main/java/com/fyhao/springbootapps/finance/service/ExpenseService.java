package com.fyhao.springbootapps.finance.service;

import com.fyhao.springbootapps.finance.entity.Expense;
import com.fyhao.springbootapps.finance.model.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Other CRUD methods as necessary...

}
