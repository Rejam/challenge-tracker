import Header from "components/Header";
import AuthenticatedApp from "views/AuthenticatedApp";
import LoginView from "views/Login";

import useAuth from "lib/hooks/useAuth";

export default function App() {
  return (
    <>
      <Header />
      <Content />
    </>
  );
}

function Content() {
  const auth = useAuth();

  if (!auth.user) return <LoginView />;
  return <AuthenticatedApp />;
}
