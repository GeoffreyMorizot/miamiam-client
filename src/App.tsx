import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import ProtectedRoutes from "./components/shared/auth/ProtectedRoutes";
import useMe from "./hooks/fetch/useMe";
import useAuth from "./hooks/useAuth";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserAuthResponse } from "./types/User";

import "./App.css";

const ROLES = {
  User: 1,
  Admin: 2,
};

function App() {
  const auth = useAuth();
  const { me } = useMe();
  useQuery<unknown, unknown, UserAuthResponse, string>("me", me, {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => {
      auth?.setUser(data);
    },
  });

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoutes allowedRoles={[ROLES.Admin]} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

function Home() {
  return <h1>Home</h1>;
}
