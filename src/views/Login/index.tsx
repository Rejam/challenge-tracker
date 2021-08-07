import useAuth from "lib/hooks/useAuth";
import Login from "components/Login";

export default function LoginView() {
  const { signupMethods } = useAuth();

  return <Login signupMethods={signupMethods} />;
}
