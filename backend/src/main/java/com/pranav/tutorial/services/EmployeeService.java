package com.pranav.tutorial.services;

import java.util.List;

import com.pranav.tutorial.model.Employee;

public interface EmployeeService {
    public Employee createEmployee(Employee employee);
    public List<Employee> getAllEmployees();
    public void deleteEmployee(Long id);
    public Employee getEmployee(Long id);
    public Employee updateEmployee(Employee employee);
}
