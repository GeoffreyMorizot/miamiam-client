import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import useLogin from "../../../hooks/fetch/useLogin";
import useAuth from "../../../hooks/useAuth";
import { UserAuthResponse, UserLoginDTO } from "../../../types/User";
import { Input } from "../../shared/inputs/Input";
import { AuthFormWrapper } from "../AuthFormWrapper";

//Composant Login
export default function Login() {
  const { register, handleSubmit } = useForm<UserLoginDTO>({
    defaultValues: { email: "romain@adonisjs.com", password: "secret1234" },
  });

  const { login } = useLogin();
  const auth = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess, isError } = useMutation<
    UserAuthResponse,
    unknown,
    UserLoginDTO,
    unknown
  >(login, {
    onSuccess: async (data) => {
      auth?.setUser(data);
      localStorage.setItem("token", data.token.token);
      navigate("/home");
    },
  });

  const onSubmit: SubmitHandler<UserLoginDTO> = (data) => {
    mutate(data);
  };

  const inputs = [
    {
      label: "Email",
      type: "email",
      field: "email",
    },
    {
      label: "Mot de passe",
      type: "password",
      field: "password",
    },
  ];

  return (
    <AuthFormWrapper title="MiaMia">
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <Input
            {...register(input.field as keyof UserLoginDTO)}
            {...input}
            type={input.type}
            key={input.field}
          />
        ))}
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        <Link to="/register">
          Pas encore inscrit ? Rejoignez-nous dès maintenant !
        </Link>
        {isError && !isSuccess ? <p>Error</p> : null}
      </form>
    </AuthFormWrapper>
  );
}
