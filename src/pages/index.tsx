import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/posts");
  };
  return (
    <div>
      <h1>My Nextjs Learning</h1>
      <Link href={"/posts"}>Posts</Link>
      <button onClick={handleClick}>Post</button>
    </div>
  );
}
