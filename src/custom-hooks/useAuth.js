import { useContext } from "react";
import { AuthContext } from "../context";

export function useAuth() {
  const { token, isLoggedIn, updateAuthStatus, logout } =
    useContext(AuthContext);

  console.log("isLoggedIn:", isLoggedIn);

  return { token, isLoggedIn, updateAuthStatus, logout };
}
