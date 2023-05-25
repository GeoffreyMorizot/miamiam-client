import { useMutation,UseMutationOptions } from "react-query";
import ky from "ky";

import { UserAuthResponse, UserRegisterDTO } from "../../types/User";

const useRegister = () => {
  async function register(payload: UserRegisterDTO): Promise<UserAuthResponse> {
    return await ky
      .post("http://127.0.0.1:3333/api/auth/register", { json: payload })
      .json();
  }
  return { register };
};

export const useRegisterQuery = (
  options: Omit<
    UseMutationOptions<UserAuthResponse, unknown, UserRegisterDTO, unknown>,
    "mutationFn" | "mutationKey"
  >
) => {
  const { register } = useRegister();
  const { mutate, isLoading, error, data } = useMutation("register", register, {
    ...options,
  });
  return { mutate, isLoading, error, data };
};

export default useRegister;
