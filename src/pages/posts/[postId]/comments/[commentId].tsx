import { useRouter } from "next/router";
export default function Comment() {
  const router = useRouter();
  console.log(router);
  const commentId = router.query.commentId;
  return (
    <>
      <h1>Comment Number {commentId}</h1>
    </>
  );
}
