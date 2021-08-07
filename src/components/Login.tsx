import { SignupMethod } from "types";

interface LoginViewProps {
  signupMethods: SignupMethod[];
}
export default function LoginView({ signupMethods }: LoginViewProps) {
  return (
    <div>
      <h1>Login</h1>
      {signupMethods.map((signup) => (
        <button key={signup.name} onClick={signup.method}>
          {signup.name}
        </button>
      ))}
    </div>
  );
}
