import React from "react";
interface Todo {
  id?: number;
  title?: string;
}
export default function Todo({ todo }: { todo: Todo }) {
  return (
    <>
      <div>Todoss</div>
      {todo.title}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { todoId } = params;
  const res = await fetch(`http://localhost:3000/api/todos/${todoId}`);
  const todo = await res.json();
  console.log("adfadsssssssf", todo);
  if (!todo) {
    return {
      notFound: true,
    };
  }
  // console.log(res);
  return {
    props: {
      todo,
    },
  };
}
