import { Input } from "../shared/inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useAuth from "../../hooks/useAuth";
import useLogin from "../../hooks/fetch/useLogin";
import styles from "./Login.module.scss";
import { redirect, useNavigate } from "react-router-dom";

export interface User {
  created_at: string;
  email: string;
  id: number;
  isAdmin: boolean;
  remember_me_token: string | null;
  role_id: number;
  token: {
    type: string;
    token: string;
  };
  updated_at: string;
}

export interface UserInputDTO extends Pick<User, "email"> {
  password: string;
}

//Composant Login
export default function Login() {
  const { register, handleSubmit } = useForm<UserInputDTO>({
    defaultValues: { email: "jamie@test.com", password: "secret1234" },
  });

  const { login } = useLogin();
  const auth = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess, isError } = useMutation<
    User,
    unknown,
    UserInputDTO,
    unknown
  >(login, {
    onSuccess: async (data) => {
      auth?.setUser(data);
      localStorage.setItem("token", data.token.token);
      navigate("/home");
    },
  });

  const onSubmit: SubmitHandler<UserInputDTO> = (data) => {
    mutate(data);
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.formWp}>
        <h1 className={styles.loginFormTitle}>
          Mia
          <br />
          Mia
        </h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} type="email" label="Email" />
          <Input
            {...register("password")}
            type="password"
            label="Mot de passe"
          />
          <button type="submit" disabled={isLoading}>
            Login
          </button>
          {isSuccess && !isError ? <p>Vous êtes connecté</p> : null}
          {isError && !isSuccess ? <p>Error</p> : null}
        </form>
      </div>
    </div>
  );
}
