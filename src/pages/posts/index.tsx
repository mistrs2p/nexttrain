import Link from "next/link";
import { Post } from "../../../components/Post";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
interface Post {
  id?: number;
  title?: string;
  body?: string;
}

export default function Posts() {
  // export default function Posts() {
  const { getPosts, error, posts } = useContext(AuthContext);
  // const [postss, setPosts] = useState<Post[] | null>(posts);
  useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error));
    }
  }, [error]);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <h1>Posts</h1>
        <div className="row g-3">
          {posts &&
            posts.map((post) => (
              <div key={post.title} className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-body">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3004/posts");
//   const posts = await res.json();
//   return {
//     props: {
//       posts: posts.slice(0, 4),
//     },
//     revalidate: 20,
//   };
// }

export async function getServerSideProps({ req }) {
  try {
    const resApi = await fetch("http://localhost:3000/api/posts/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });
    const data = await resApi.json();

    if (resApi.ok) {
      return {
        props: {
          posts: data,
          error: null,
        },
      };
    } else {
      return {
        props: {
          posts: null,
          error: data,
        },
      };
    }
  } catch (e) {
    return {
      props: {
        posts: null,
        error: "Server Error",
      },
    };
  }
}
