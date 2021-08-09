import { useRoutes } from "react-router-dom";

import Challenge from "./challenge";
import Home from "./home";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/challenges/:id", element: <Challenge /> },
];

export default function AuthenticatedAppView() {
  return useRoutes(routes);
}
