import { useRouter } from "next/router";
import { useState } from "react";
interface Todo {
  id?: number;
  title?: string;
}
// export default function Posts({ posts }: { posts: Post[] }) {
export default function TodosPage({ todos }: { todos: Todo[] }) {
  const router = useRouter();

  const [todo, setTodo] = useState("");
  const submitTodo = async () => {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };
  const DeleteTodo = async (todoId: number | undefined) => {
    if (todoId) {
      const req = await fetch(`http://localhost:3000/api/todos/${todoId}`, {
        method: "DELETE",
      });
      const res = await req.json();
      console.log(res);
    }
  };
  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>Todos</div>
      <input className="text-black" type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={submitTodo}>Submit</button>
      <ul>
        {todos?.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button className="btn " onClick={() => DeleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/todos");
  if (res.status != 200) {
    return {
      props: {
        todos: [],
      },
    };
  }
  // console.log(res);
  console.log(res.status);
  const todos = await res.json();
  return {
    props: {
      todos: todos,
      fallback: true,
    },
    revalidate: 20,
  };
}

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3004/posts");
//   const posts = await res.json();
//   return {
//     props: {
//       posts: posts.slice(0, 4),
//     },
//   };
// }
