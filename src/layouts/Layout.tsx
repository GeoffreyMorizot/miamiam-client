import { useMutation } from "react-query";
import { Link, Outlet } from "react-router-dom";

import useLogout from "../hooks/fetch/useLogout";
import useAuth from "../hooks/useAuth";

import styles from "./Layout.module.scss";

export default function Layout() {
  const auth = useAuth();
  const { logout: logoutFn } = useLogout();

  const { mutate: logout } = useMutation(logoutFn, {
    onSuccess: () => {
      localStorage.removeItem("token");
      auth?.setUser(null);
    },
  });

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          Mia
          <br />
          Mia
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <nav>
            <ul>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/">Home</Link>
            </ul>
          </nav>
          {auth?.user && <p>{auth.user.email}</p>}
          <button onClick={() => logout()}>Logout</button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
