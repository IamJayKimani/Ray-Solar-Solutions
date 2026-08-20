import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Ray Solar Solutions and power a brighter future"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
