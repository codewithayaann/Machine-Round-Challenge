import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file
import { getData, setData } from './utils/localstorage';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData(id, value)
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const username = getData('username');
    const email = getData('email');
    const phone = getData('phone');
    setFormData({
      username,
      email,
      phone,
    })
  }, [])

  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
      </form>
      <div className="display-data">
        {formData.username && <p>Username: {formData.username}</p>}
        {formData.email && <p>Email: {formData.email}</p>}
        {formData.phone && <p>Phone Number: {formData.phone}</p>}
      </div>
    </div>
  );
}

export default App;
