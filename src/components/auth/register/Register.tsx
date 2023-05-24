import { SubmitHandler, useForm } from "react-hook-form";
import { Input, InputProps } from "../../shared/inputs/Input";
import { UserRegisterDTO } from "../../../types/User";
import { useRegisterQuery } from "../../../hooks/fetch/useRegister";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
import { AuthFormWrapper } from "../AuthFormWrapper";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { mutate } = useRegisterQuery({
    onSuccess: (data) => {
      auth?.setUser(data);
      localStorage.setItem("token", data.token.token);
      navigate("/");
    },
  });

  const { register, handleSubmit } = useForm<UserRegisterDTO>({
    defaultValues: {
      email: "@example.com",
      password: "secret1234",
      password_confirmation: "secret1234",
    },
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<UserRegisterDTO> = (data) => {
    mutate(data);
  };

  const inputs: InputProps[] = [
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
    {
      label: "Confirmer le mot de passe",
      type: "password",
      field: "password_confirmation",
    },
  ];

  return (
    <AuthFormWrapper title={"Bienvenue sur MiaMia"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <Input
            {...register(input.field as keyof UserRegisterDTO)}
            {...input}
            type={input.type}
            key={input.field}
          />
        ))}
        <button type="submit">S'inscrire</button>
        <Link to="/login">
          Déjà inscrit ? Connectez-vous ici pour accéder à votre compte.
        </Link>
      </form>
    </AuthFormWrapper>
  );
}
