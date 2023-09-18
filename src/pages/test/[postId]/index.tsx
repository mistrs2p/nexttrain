import { useRouter } from "next/router";
interface Post {
  id: number;
  title: string;
  body: string;
}
export default function Post({ post }: { post: Post }) {
  const router = useRouter();
  const postId = router.query.postId;
  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h1>Post Number {post.id}</h1>
      <div>{post.title}</div>
      <p>{post.body}</p>
    </>
  );
}
// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3004/posts");
//   const posts = await res.json();
//   const paths = posts.slice(0, 4).map((post: Post) => {
//     return {
//       params: { postId: `${post.id}` },
//     };
//   });
//   return {
//     paths,
//     fallback: true,
//   };
// }
// export async function getStaticProps(context: any) {
//   const { params } = context;
//   const res = await fetch(`http://localhost:3004/posts/${params.postId}`);
//   const post = await res.json();
//   console.log(`Generating page for /post/${params.postId}`);
//   if (!post.id) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       post,
//     },
//   };
// }

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=ali"]);
  const response = await fetch(`http://localhost:3004/posts/${params.postId}`);
  const post = await response.json();
  console.log(`Generating page for /post/${params.postId}`);
  if (!post.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
}
