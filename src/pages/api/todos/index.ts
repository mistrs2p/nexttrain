// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
const data = fs.readFileSync("db.json").toString();
interface Todo {
  id: number;
  title: string;
}
type JsonData = {
  todos: Todo[];
};
const jsonData: JsonData = JSON.parse(data);
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const todo = req.body.todo;
    const newTodo = {
      id: Date.now(),
      title: todo,
    };
    jsonData.todos.push(newTodo);
    const jsonString = JSON.stringify(jsonData);
    try {
      fs.writeFileSync("db.json", jsonString, "utf-8");
      console.log("Created");
    } catch (err) {
      console.log("Data not added to file");
      throw err;
    }
  } else {
    const data = await fetch("http://localhost:3004/todos");
    const response = await data.json();
    res.status(200).json(response);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
}