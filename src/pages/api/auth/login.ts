// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req", req.body);
  if (req.method === "POST") {
    try {
      const resApi = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      const response = await resApi.json();
      if (resApi.ok) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", String(response.access_token), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            maxAge: 60 * 60 * 8, // 1 week
            path: "/",
          })
        );
        res.status(200).json(response);
        console.log("Note: ", response);
      } else {
        res.status(resApi.status).json({ message: response });
        // console.log("Note Error: ", response);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: { detail: "server error" } });
    }
    // console.log(req.body);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ msg: `Method ${req.method} not allow` });
  }
  // res.status(200).json({ msg: "Success" });
}
