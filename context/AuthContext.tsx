import { useRouter } from "next/router";
import { createContext, useState } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // register user
  const register = async (user) => {
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      console.log("OK");
      router.push("/auth/login");
    } else {
      setError(data);
    }
    setLoading(false);
  };

  // login user
  const login = async (user) => {
    console.log(user);
  };
  // logout user
  const logout = async () => {
    console.log("logout");
  };
  // check if user logged in
  const checkUserLoggedIn = async () => {
    console.log("Auth");
  };

  return <AuthContext.Provider value={{ error, loading, register, login, logout, checkUserLoggedIn }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
