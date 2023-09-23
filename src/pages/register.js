import React, { useState } from 'react';
import { useRouter } from 'next/router';

function Register() {
  const router = useRouter();

  // State to hold registration form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // Add other registration fields here
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle user registration
  const handleRegister = async () => {
    // Call the NextAuth.js API route for registration
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Registration was successful, sign in the user
      console.log("Success")
    } else {
      // Handle registration errors, e.g., display error messages
      console.log("error")
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* Add other registration fields as needed */}
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
