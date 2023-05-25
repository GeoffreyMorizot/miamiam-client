import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouteObject,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Login from "./components/auth/login/Login.tsx";
import ProtectedRoutes from "./components/shared/auth/ProtectedRoutes.tsx";
import PublicRoutes from "./components/shared/auth/PublicRoutes.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Layout from "./layouts/Layout.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import App from "./App.tsx";

import "./index.scss";

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
