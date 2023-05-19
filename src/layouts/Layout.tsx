import { Outlet, useLocation } from "react-router-dom";
import Login from "../components/Login";
import { useMutation, useQuery } from "react-query";

export default function Root() {
  const route = useLocation();

  const { mutate: logout } = useMutation("logout", {
    onMutate: async () => {
      console.log(localStorage.getItem("token"));
      await fetch("http://localhost:3333/api/auth/logout", {
        method: "DELETE",
        headers: {
          credentials: "include",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      localStorage.removeItem("token");
    },
  });

  return (
    <div>
      <header>
        <a href="/">MiaMia</a>
        <nav>
          <ul>
            <li>
              <a href={`/dashboard`}>Dashboard</a>
            </li>
          </ul>
          <button onClick={() => logout()}>Logout</button>
        </nav>
      </header>
      <main>
        {route.pathname === "/" && <Login />}
        <Outlet />
      </main>
    </div>
  );
}
