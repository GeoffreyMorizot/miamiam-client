import ky from "ky";

const useMe = () => {
  async function me() {
    return await ky
      .get("http://127.0.0.1:3333/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .json();
  }
  return { me };
};

export default useMe;
