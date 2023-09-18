import Link from "next/link";
import { Post } from "../../../components/Post";
import { useEffect, useState } from "react";
interface Post {
  id?: number;
  title?: string;
  body?: string;
}
// export default function Posts({ posts }: { posts: Post[] }) {
export default function TestM() {
  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
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

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3004/posts");
//   const posts = await res.json();
//   return {
//     props: {
//       posts: posts.slice(0, 4),
//     },
//   };
// }
