import Link from "next/link";
import { Post } from "../../../components/Post";
interface Post {
  id: number;
  title: string;
  body: string;
}
export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <>
      <div>Posts</div>
      <ul>
        {posts.map((post) => {
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

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: {
      posts: posts.slice(0, 4),
    },
  };
}
