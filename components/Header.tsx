import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  // console.log(router);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" href={"/"}>
          NextApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  router.pathname == "/" ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  router.pathname == "/posts" ? "nav-link active" : "nav-link"
                }
                href="/posts"
              >
                Posts
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {user ? (
              <>
                <span>{user.name}</span>
                <button
                  onClick={logout}
                  className="btn btn-sm btn-outline-secondary ms-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/login"}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  Login
                </Link>
                <Link href={"/auth/register"} className="btn btn-sm btn-dark ">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
