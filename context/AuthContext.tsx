import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import cookie from "cookie";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);
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
    // console.log(user);
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    // console.log(res.ok);
    if (res.ok) {
      // console.log("OK");
      setUser(null);
      router.push("/");
    } else {
      console.log("error", data);
      setError(data);
    }
    setLoading(false);
    // router.push("/auth/login");

    console.log("logout");
  };
  const getPosts = async () => {
    setError(null);
    const res = await fetch("/api/posts/posts", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      // console.log("OK");
      setPosts(data);
    } else {
      console.log("error", data);
      setError(data);
    }
    setLoading(false);
  };
  // check if user logged in
  const checkUserLoggedIn = async () => {
    setError(null);
    console.log("Auth");
    const res = await fetch("/api/auth/me", {
      method: "POST",
    });
    const data = await res.json();

    if (res.ok) {
      // console.log("OK");
      setUser(data.user);
      // router.push("/");
    } else {
      console.log("error", data);
      setUser(null);
      setError(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        register,
        login,
        logout,
        getPosts,
        checkUserLoggedIn,
        posts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
