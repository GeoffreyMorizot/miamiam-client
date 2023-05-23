import ky from "ky";
import { User, UserInputDTO } from "../../components/Login/Login";

const useLogin = () => {
  async function login(data: UserInputDTO): Promise<User> {
    return await ky
      .post("http://127.0.0.1:3333/api/auth/login", {
        json: data,
      })
      .json();
  }
  return { login };
};

export default useLogin;
