import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, loading, register } = useContext(AuthContext);
  useEffect(() => {
    if (error) {
      console.log(error, "useEffect");
      toast.error(error.message.detail);
    }
  }, [error]);
  const handleRegister = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.error("Name and Email and Password is required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password do not matches");
      return;
    }
    register({ name, email, password });
    // toast.success("Dog Noobe");
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
              </div>
              <div className="mb-3">
                <label htmlFor="c-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="c-password"
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary">
                Register
                {loading && <div className="spinner-border spinner-border-sm ms-1" role="status"></div>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
