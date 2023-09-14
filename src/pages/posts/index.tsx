import Link from "next/link";
import { Post } from "../../../components/Post";

export default function Posts({ posts }: { posts: any }) {
  return (
    <>
      <div>Posts</div>
      <ul>
        <li>
          <Link href={`/posts/20`} replace>
            Post 20
          </Link>
        </li>
        <li>
          <Link href={`/posts/70`} replace>
            Post 70
          </Link>
        </li>
        <li>
          <Link href={`/posts/314`} replace>
            Post 314
          </Link>
        </li>
      </ul>
      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.id}>
              <Post post={post} />
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
      posts,
    },
  };
}
