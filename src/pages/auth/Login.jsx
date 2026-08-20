import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Ray Solar Solutions account"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;