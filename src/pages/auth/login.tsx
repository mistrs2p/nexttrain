import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, login } = useContext(AuthContext);
  useEffect(() => {
    if (error) {
      console.log(error, "useEffect");
      toast.error(JSON.stringify(error.message.detail));
    }
  }, [error]);
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Email and Password is required!");
      return;
    }
    login({ email, password });
    // toast.success("Dog Noobe");
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            {JSON.stringify(error)}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                Login
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm ms-1"
                    role="status"
                  ></div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
