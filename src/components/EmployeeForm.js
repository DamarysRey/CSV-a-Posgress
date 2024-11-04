import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    job_id: '',
    salary: '',
    commission_pct: '',
    manager_id: '',
    department_id: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      employee_id: '',
      first_name: '',
      last_name: '',
      email: '',
      job_id: '',
      salary: '',
      commission_pct: '',
      manager_id: '',
      department_id: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Job_id:</label>
        <input
          type="text"
          name="job_id"
          placeholder="Job ID"
          value={formData.job_id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Salario:</label>
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Porcentaje de Comision:</label>
        <input
          type="number"
          name="commission_pct"
          placeholder="Commission Percentage"
          value={formData.commission_pct}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Id Manager:</label>
        <input
          type="number"
          name="manager_id"
          placeholder="Manager ID"
          value={formData.manager_id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Id Departamento:</label>
        <input
          type="number"
          name="department_id"
          placeholder="Department ID"
          value={formData.department_id}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">GUARDAR</button>
    </form>
  );
};

export default EmployeeForm;
