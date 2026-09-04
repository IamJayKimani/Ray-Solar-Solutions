import { Link } from "react-router-dom";

function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend authentication will be connected here later.
    console.log("Login submitted");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <div className="label-row">
          <label htmlFor="password">Password</label>

          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="remember-row">
        <label>
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
      </div>

      <button type="submit" className="auth-button">
        Sign In
      </button>

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/register">Create an account</Link>
      </p>
    </form>
  );
}

export default LoginForm;
