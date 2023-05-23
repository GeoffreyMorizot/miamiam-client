import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouteObject,
  RouterProvider,
  Routes,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/AuthContext.tsx";
import Login from "./components/Login/Login.tsx";
import Layout from "./layouts/Layout.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import PublicRoutes from "./components/shared/auth/PublicRoutes.tsx";
import ProtectedRoutes from "./components/shared/auth/ProtectedRoutes.tsx";
import App from "./App.tsx";

/* const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: "/login",
    element: <Login />,
  },
]); */

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
