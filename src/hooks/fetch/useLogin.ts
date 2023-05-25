import ky from "ky";

import { UserInputDTO } from "../../components/auth/login/Login";
import { UserAuthResponse } from "../../types/User";

const useLogin = () => {
  async function login(payload: UserInputDTO): Promise<UserAuthResponse> {
    return await ky
      .post("http://127.0.0.1:3333/api/auth/login", {
        json: payload,
      })
      .json();
  }
  return { login };
};

export default useLogin;
