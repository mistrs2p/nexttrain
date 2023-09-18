import Link from "next/link";
import { useRouter } from "next/router";
import style from "@/styles/Home.module.scss";
export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/posts");
  };
  return (
    <div>
      <h1 className={style.fontL}>My Nextjs Learning</h1>
      <Link href={"/posts"}>Posts</Link>
      <button onClick={handleClick}>Post</button>
      <style jsx>{`
        p {
          color: red;
        }
      `}</style>
      <p>sadfasfkjhsalkjhsdflkj</p>
    </div>
  );
}
