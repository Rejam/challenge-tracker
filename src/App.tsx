import useAuth from "lib/hooks/useAuth";

import AuthenticatedApp from "views/AuthenticatedApp";
import LoginView from "views/Login";

export default function App() {
  const auth = useAuth();

  if (!auth.user) return <LoginView />;
  return <AuthenticatedApp />;
}
