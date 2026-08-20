import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const [role, setRole] = useState("customer");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Registration submitted", {
      role,
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First name</label>

          <input
            type="text"
            id="firstName"
            placeholder="First name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name</label>

          <input
            type="text"
            id="lastName"
            placeholder="Last name"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="registerEmail">Email address</label>

        <input
          type="email"
          id="registerEmail"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone number</label>

        <input
          type="tel"
          id="phone"
          placeholder="e.g. 0712 345 678"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerPassword">Password</label>

        <input
          type="password"
          id="registerPassword"
          placeholder="Create a password"
          required
        />
      </div>

      <div className="form-group">
        <label>Account type</label>

        <div className="role-options">
          <button
            type="button"
            className={`role-card ${
              role === "customer" ? "active" : ""
            }`}
            onClick={() => setRole("customer")}
          >
            <span className="role-icon">👤</span>
            <strong>Customer</strong>
            <small>Browse and purchase solar products</small>
          </button>

          <button
            type="button"
            className={`role-card ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            <span className="role-icon">⚙</span>
            <strong>Admin</strong>
            <small>Manage products and orders</small>
          </button>
        </div>
      </div>

      <button type="submit" className="auth-button">
        Create Account
      </button>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}

export default RegisterForm;