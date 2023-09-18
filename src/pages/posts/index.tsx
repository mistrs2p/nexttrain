import Link from "next/link";
import { Post } from "../../../components/Post";
import { useEffect, useState } from "react";
interface Post {
  id?: number;
  title?: string;
  body?: string;
}
// export default function Posts({ posts }: { posts: Post[] }) {
export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    async function fetchPostData() {
      const res = await fetch("http://localhost:3004/posts");
      const posts = await res.json();
      setPosts(posts);
      setLoading(false);
    }
    fetchPostData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div className="text-3xl font-bold underline">Posts</div>
      <ul>
        {posts?.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <Post post={post} />
              </Link>
            </li>
          );
        })}
      </ul>
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

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3004/posts");
//   const posts = await res.json();
//   return {
//     props: {
//       posts: posts.slice(0, 4),
//     },
//   };
// }
