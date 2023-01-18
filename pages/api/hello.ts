// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  name: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

//local
// const base_url ="http://localhost:5003/"
//const api_url = "http://localhost:5003/api/";

//server
const backend_url = "https://api-school.mangoitsol.com/";
const base_url = "https://school.mangoitsol.com/";
const api_url = "https://api-school.mangoitsol.com/api/";
const auth_token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4";
export { api_url,auth_token, base_url, backend_url };
