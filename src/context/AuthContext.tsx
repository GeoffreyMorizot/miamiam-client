import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { UserAuthResponse } from "../types/User";

export type AuthedUser = UserAuthResponse;

export interface AuthCtx {
  user: AuthedUser | null;
  setUser: Dispatch<SetStateAction<AuthedUser | null>>;
}

export const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthedUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
