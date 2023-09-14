import Link from "next/link";
import { useRouter } from "next/router";
export default function Post() {
  const router = useRouter();
  const postId = router.query.postId;
  return (
    <>
      <h1>Post Number {postId}</h1>
    </>
  );
}
