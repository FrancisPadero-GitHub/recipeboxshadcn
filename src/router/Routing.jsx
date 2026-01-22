import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// pages
import Landing from "../layout/Landing";

// for the data stuff later instead of relying on useEffect im gonna use
// tanstack query for better state management and cool effects
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "to be added",
  },
  {
    path: "to be added",
  },
]);

function Routing() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default Routing;

// This is for the Tanstack Query Dev tools
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
