// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("rssggwergeq", req.cookies.token);
  if (req.method === "GET") {
    try {
      const resApi = await fetch("http://127.0.0.1:8000/blog", {
        method: "GET",
        headers: {
          authorization: `Bearer ${req.cookies.token}`,
        },
      });
      const response = await resApi.json();
      if (resApi.ok) {
        res.status(200).json(response);
      } else {
        res.status(resApi.status).json({ message: response });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: { detail: "server error" } });
    }
    // console.log(req.body);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ msg: `Method ${req.method} not allow` });
  }
  // res.status(200).json({ msg: "Success" });
}
