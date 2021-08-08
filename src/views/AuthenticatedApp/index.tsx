import { useRoutes } from "hookrouter";

import Challenge from "./challenge";
import Home from "./home";

const routes = {
  "/": () => <Home />,
  "/challenge/:id": ({ id }: any) => <Challenge id={id} />,
};

export default function AuthenticatedAppView() {
  return useRoutes(routes);
}
