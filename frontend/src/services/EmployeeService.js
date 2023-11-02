import axios from "axios"

const EMPLOYEE_API_BASE_URL = "https://spring-crud-service.onrender.com/api"

class EmployeeService {
    saveEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL + "/employees", employee)
    }

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + "/employees")
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/employees/" + id)
    }

    getEmployee(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + "/employee/" + id)
    }

    updateEmployee(employee) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/employee/" + employee.id, employee)
    }
}

const employeeService = new EmployeeService()

export default employeeService