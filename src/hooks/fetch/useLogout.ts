import ky from "ky";

const useLogout = () => {
  async function logout() {
    return await ky
      .delete("http://127.0.0.1:3333/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .json()
      .then(() => {
        localStorage.removeItem("token");
      });
  }
  return { logout };
};

export default useLogout;
