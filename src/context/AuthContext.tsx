import { PropsWithChildren, createContext } from "react";
import { User } from "../components/Login";

export const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
