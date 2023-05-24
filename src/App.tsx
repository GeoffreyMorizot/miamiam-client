import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login/Login";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoutes from "./components/shared/auth/ProtectedRoutes";
import useAuth from "./hooks/useAuth";
import useMe from "./hooks/fetch/useMe";
import { useQuery } from "react-query";
import { UserAuthResponse } from "./types/User";
import Register from "./components/auth/register/Register";

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
