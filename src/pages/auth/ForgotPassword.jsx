import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";

function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Password reset requested");
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll help you get back into your account"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="resetEmail">Email address</label>

          <input
            type="email"
            id="resetEmail"
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Send Reset Link
        </button>

        <p className="auth-switch">
          Remember your password?{" "}
          <Link to="/login">Back to sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;