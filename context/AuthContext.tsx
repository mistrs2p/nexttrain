import { useRouter } from "next/router";
import { createContext, useState } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: user.email, password: user.password }),
    });
    const data = await res.json();
    console.log(data);
    console.log(res.ok);
    if (res.ok) {
      console.log("OK");
      setUser(data.user);
      router.push("/");
    } else {
      console.log("error", data);
      setError(data);
    }
    setLoading(false);
  };
  // logout user
  const logout = async () => {
    setUser(null);
    router.push("/auth/login");

    console.log("logout");
  };
  // check if user logged in
  const checkUserLoggedIn = async () => {
    console.log("Auth");
  };

  return <AuthContext.Provider value={{ user, error, loading, register, login, logout, checkUserLoggedIn }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
