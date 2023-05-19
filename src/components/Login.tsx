import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./shared/inputs/Input";
import { QueryFunction, useMutation, useQuery } from "react-query";

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

interface UserInputDTO extends Pick<User, "email"> {
  password: string;
}

// Login API call (a déplacer et factoriser)
async function handleLogin(data: UserInputDTO) {
  const res = await fetch("http://localhost:3333/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// Set token in cookie (a déplacer et factoriser)
const setTokenInCookie = (token: string, expirationDays: number) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `token=${token}; ${expires}; path=/; `;
};

//Composant Login
export default function Login() {
  const { register, handleSubmit } = useForm<UserInputDTO>({
    defaultValues: { email: "jamie@test.com", password: "secret1234" },
  });

  const { data, refetch: fetchUser } = useQuery("users", {
    queryFn: async () => {
      await fetch("http://localhost:3333/api/users", {
        method: "GET",
        headers: {
          credentials: "include",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: handleLogin,
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token.token);
      fetchUser();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<UserInputDTO> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email")} type="email" label="Email" />
        <Input {...register("password")} type="password" label="Mot de passe" />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
}
