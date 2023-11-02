import React, { useState } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

    const [employee, setEmployee] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    })
    const [status, setStatus] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        const val = e.target.value
        setEmployee({...employee, [e.target.name]: val})
    }

    const saveEmployee = (e) => {
        e.preventDefault()
        EmployeeService.saveEmployee(employee)
            .then(response => {
                if (response.status === 200) {
                    setStatus("Saved Successfully")
                    navigate("/")
                }
                else {
                    setStatus("Error Saving Employee")
                }
            })
            .catch(e => {
                setStatus("Internal Server Error")
            })
    }

    const clearAll = (e) => {
        e.preventDefault()
        setEmployee({
            id: "",
            firstName: "",
            lastName: "",
            email: ""
        })
    }

    return (
        <div className='flex max-w-2xl shadow border-b mx-auto'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    <h1>Add New Employee</h1>
                </div>
                <div className='items-center justify-center h-14 w-full my-8'>
                    <label className='block'>First Name</label>
                    <input className='h-10 w-100 border rounded-lg px-3 mt-3' type='text' name="firstName" value={employee.firstName} onChange={(e) => handleChange(e)}></input>
                </div>
                <div className='items-center justify-center h-14 w-full my-8'>
                    <label className='block'>Last Name</label>
                    <input className='h-10 w-100 border rounded-lg px-3 mt-3' type='text' name="lastName" value={employee.lastName} onChange={(e) => handleChange(e)}></input>
                </div>
                <div className='items-center justify-center h-14 w-full my-8'>
                    <label className='block'>Email</label>
                    <input className='h-10 w-100 border rounded-lg px-3 mt-3' type='email' name="email" value={employee.email} onChange={(e) => handleChange(e)}></input>
                </div>
                <div className='items-center justify-center h-14 w-full'>
                    <button className='rounded-full font-bold bg-blue-300 p-2 w-20 hover:bg-blue-400 mr-5' onClick={saveEmployee}>Save</button>
                    <button className='rounded-full font-bold bg-red-300 p-2 w-20 hover:bg-red-400' onClick={clearAll}>Clear</button>
                </div>
                {status !== "" && 
                <div className='items-center justify-center h-14 w-full'>
                    {status === "Saved Successfully" && <label className='text-green-600 font-bold'>{status}</label>}
                    {status !== "Saved Successfully" && <label className='text-red-600 font-bold'>{status}</label>}
                </div>
                }
            </div>
        </div>
    )
}

export default AddEmployee