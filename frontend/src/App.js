import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/AddEmployee';
import Navbar from './components/NavBar';
import EmployeeList from './components/EmployeeList';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route index element={<EmployeeList/>}></Route>
          <Route path="/" element={<EmployeeList/>}></Route>
          <Route path="/add" element={<AddEmployee/>}></Route>
          <Route path="/update/:id" element={<UpdateEmployee/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
