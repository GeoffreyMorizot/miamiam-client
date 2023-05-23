import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { User } from "../components/Login/Login";

export type Auth = Pick<User, "email" | "role_id">;

export interface AuthCtx {
  user: Auth | null;
  setUser: Dispatch<SetStateAction<Auth | null>>;
}

export const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
