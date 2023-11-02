import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import employeeService from '../services/EmployeeService'

const UpdateEmployee = () => {
    const {id} = useParams()
    const [status, setStatus] = useState("")
    const [employee, setEmployee] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
        employeeService.getEmployee(id)
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                else {
                    navigate("/")
                }
            })
            .then(data => {
                setEmployee(data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }, [navigate, id])

    const handleChange = (e) => {
        e.preventDefault()
        setEmployee({...employee, [e.target.name]: e.target.value})
    }
    
    const cancelUpdate = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const updateEmployee = (e) => {
        e.preventDefault()
        employeeService.updateEmployee(employee)
            .then(response => {
                if (response.status === 200) {
                    navigate("/")
                }
                else {
                    setStatus("Error While Updating")
                }
            })
            .catch(e => {
                setStatus("Internal Server Error")
            })
    }

    return (
        <div className='flex max-w-2xl shadow border-b mx-auto'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    <h1>Update Employee</h1>
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
                    <button className='rounded-full font-bold bg-blue-300 p-2 w-20 hover:bg-blue-400 mr-5' onClick={updateEmployee}>Update</button>
                    <button className='rounded-full font-bold bg-red-300 p-2 w-20 hover:bg-red-400' onClick={cancelUpdate}>Cancel</button>
                </div>
                {status !== "" && 
                <div className='items-center justify-center h-14 w-full'>
                    <label className='text-red-600 font-bold'>{status}</label>
                </div>
                }
            </div>
        </div>
    )
}

export default UpdateEmployee