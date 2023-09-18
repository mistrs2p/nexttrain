import type { NextApiRequest, NextApiResponse } from "next";
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
interface Todo {
  id: number;
  title: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  const { todoId } = req.query;
  const todoIdR: number = parseInt(`${todoId}`);

  if (req.method === "DELETE") {
    const selectedData: number = jsonData.todos.findIndex((resTodo) => resTodo.id === todoIdR);
    if (selectedData > -1) {
      jsonData.todos.splice(selectedData, 1);
      const jsonString = JSON.stringify(jsonData);
      try {
        fs.writeFileSync("db.json", jsonString, "utf-8");
        console.log("Deleted");
        res.status(200).json("Deleted");
      } catch (err) {
        console.log("Data not Deleted");
        throw err;
      }
    }
  } else if (req.method == "GET") {
    const data = await fetch("http://localhost:3004/todos");
    const response: Todo[] = await data.json();
    // console.log(typeof todoId);
    const selectedData = response.find((resTodo) => resTodo.id === todoIdR);
    if (!selectedData) {
      console.log(selectedData);
      res.status(200).json(false);
    }
    // console.log(selectedData);
    res.status(200).json(selectedData);
  }
}
