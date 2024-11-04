import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const saveEmployee = (employee) => {
    if (employee.employee_id) {
      setEmployees(employees.map(emp => emp.employee_id === employee.employee_id ? employee : emp));
    } else {
      employee.employee_id = Date.now(); 
      setEmployees([...employees, employee]);
    }
    setCurrentEmployee(null);
    console.log(employees); 
  };
  

  const editEmployee = (employee) => {
    setCurrentEmployee(employee);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/employees" element={
          <>
            <h1 style={{ color: '#A874D2' }}>Empleados</h1>
            <EmployeeForm employee={currentEmployee} onSave={saveEmployee} />
            <ul>
              {employees.map(emp => (
                <li key={emp.id}>
                  {emp.first_name} {emp.last_name} {emp.email} {emp.job_id} {emp.salary} {emp.commission_pct} {emp.manager_id} {emp.department_id}
                  <button onClick={() => editEmployee(emp)}>Editar</button>
                  <button onClick={() => deleteEmployee(emp.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </>
        } />
        <Route path="/" element={<h1>Bienvenido</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
