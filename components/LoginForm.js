import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [id, setId] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && role) {
      onLogin(id, role);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="id">User ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter your ID"
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <button type="submit">Login</button>
      <style jsx>{`
        .login-form {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          width: 300px;
          margin: 50px auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 16px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        input,
        select {
          width: 100%;
          padding: 8px;
          margin-bottom: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          background-color: #2e7d32;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
        }
        button:hover {
          background-color: #1b5e20;
        }
      `}</style>
    </form>
  );
}
