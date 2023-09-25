// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   console.log("Note Me: ", req);
  console.log("reqMe", req.cookies.token);

  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(403).json({ message: `Not Authorized` });
      return;
    }
    try {
      const resApi = await fetch("http://127.0.0.1:8000/user/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });
      const response = await resApi.json();
      //   console.log(response);
      if (resApi.ok) {
        res.status(200).json({ user: response });
        // console.log("Note: ", response);
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
