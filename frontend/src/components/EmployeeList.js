import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'
import employeeService from '../services/EmployeeService'

const EmployeeList = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [employees, setEmployees] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        setError("")
        employeeService.getEmployees()
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                else {
                    setError("Error Fetching Employees")
                }
            })
            .then(data => {
                setEmployees(data)
            })
            .then(() => {
                setLoading(false)
            })
            .catch(e => {
                setError("Internal Server Error")
                setLoading(false)
            })
    }, [])

    const addEmployee = (e) => {
        navigate("/add")
    }

    const deleteEmployee = (e, id) => {
        employeeService.deleteEmployee(id)
            .then(response => {
                if (response.status === 200) {
                    setEmployees((prevEmployees) => {
                        return prevEmployees.filter((employee) => employee.id !== id)
                    })
                }
            })
            .catch(e => {

            })
    }

    return (
        <div className='container mx-auto my-6'>
            <div className='h-12'>
                <button className='rounded-full bg-slate-700 text-white px-6 py-2 font-semibold' onClick={addEmployee}>+ Add Employee</button>
            </div>
            <div className='flex shadow border-b'>
                {(!loading && error === "") && 
                <table className='min-w-full'>
                    <thead className='bg-blue-100 font-medium text-black-500 text-left uppercase tracking-wider'>
                        <tr>
                            <th className='px-10 py-2'>First Name</th>
                            <th className='px-10 py-2'>Last Name</th>
                            <th className='px-10 py-2'>Email</th>
                            <th className='px-10 py-2 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                        <tr key={emp.id} className='border-b'>
                            <td className='px-10 py-2 text-left whitespace-nowrap'>
                                <div>{emp.firstName}</div>
                            </td>
                            <td className='px-10 py-2 text-left whitespace-nowrap'>
                                <div>{emp.lastName}</div>
                            </td>
                            <td className='px-10 py-2 text-left whitespace-nowrap'>
                                <div>{emp.email}</div>
                            </td>
                            <td className='flex px-10 py-2 justify-center whitespace-nowrap gap-2'>
                                <button className='flex align-center justify-center px-2 py-1 rounded-full bg-blue-400 w-20 hover:bg-blue-500' onClick={(e, id) => {e.preventDefault(); navigate("/update/" + emp.id)}}>UPDATE</button>
                                <button className='flex align-center justify-center px-2 py-1 rounded-full bg-slate-400 w-20 hover:bg-slate-500' onClick={(e, id) => deleteEmployee(e, emp.id)}>DELETE</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>}
                {loading &&
                <ReactLoading className='mx-auto' type='spinningBubbles' color='grey'></ReactLoading>
                }
                {(!loading && error !== "") &&
                <div className='text-red-600 font-bold text-2xl mx-auto'>{error}</div>
                }
            </div>
        </div>
    )
}

export default EmployeeList