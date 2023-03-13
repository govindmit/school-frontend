//   export const config  ={
//     JWT : {
//         SECRET: 'TEST_SECRET'
//     },
//     // MODE : 'DEV',
//     // PROD_MODE : MODE ==='DEV' ? false: true;
//     IS_CERT_AUTH_ENABLED : false,
//     CURRENCY: process.env.NEXT_PUBLIC_CURRENCY_LABEL || "QAR",
//     TEST_GATEWAY : {
//         BASEURL: process.env.NEXT_PUBLIC_TEST_GATEWAY_URL || "https://amexmena.gateway.mastercard.com",
//         API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || "62",
//         USERNAME: 'merchant.' + process.env.NEXT_PUBLIC_USERNAME || "TEST9767612138",
//         // USERNAME: "merchant.TEST9767612138",
//         PASSWORD:  "Aemempgs@1" ,
//         MERCHANTID:  "TEST9767612138",
//         AMEX_TOKEN : process.env.NEXT_PUBLIC_AMEX_TOKEN || "bWVyY2hhbnQuVEVTVDk3Njc2MTIxMzg6MDk0YmY0ZmZlNWMxYjRmOWU1NWY1NmMxNWFjNTM0ZTE:",
//         DB_BASE_URL : process.env.NEXT_PUBLIC_DB_API_BASE_URL,
//         AMEX_REDIRECT_URL :  process.env.NEXT_PUBLIC_REDIRECT_URL
//     },
//     PKI_GATEWAY : {
//         BASEURL: process.env.NEXT_PUBLIC_BASEURL || "https://amexmena.gateway.mastercard.com" ,
//         API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || "62",
//         // MERCHANTID:process.env.USERNAME || "TESTUSER"
//         MERCHANTID:"TESTUSER"
//     },
//     WEBHOOKS : {
//         WEBHOOKS_NOTIFICATION_SECRET : process.env.NEXT_PUBLIC_WEBHOOKS_NOTIFICATION_SECRET,
//         WEBHOOKS_NOTIFICATION_FOLDER : 'webhooks-notifications'
//     },
//     SSL_FILES : {
//         CRT: process.env.NEXT_PUBLIC_SSL_CRT_PATH,
//         KEY: process.env.NEXT_PUBLIC_SSL_KEY_PATH
//     }

//   };

const IS_CERT_AUTH_ENABLED = false;
const BASEURL =
  process.env.NEXT_PUBLIC_TEST_GATEWAY_URL ||
  "https://amexmena.gateway.mastercard.com";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "62";
const USERNAME =
  "merchant." + process.env.NEXT_PUBLIC_USERNAME || "TEST9767612138";
const PASSWORD = "Aemempgs@1";
const MERCHANTID = "TEST9767612138";
const AMEX_TOKEN =
  process.env.NEXT_PUBLIC_AMEX_TOKEN ||
  "bWVyY2hhbnQuVEVTVDk3Njc2MTIxMzg6MDk0YmY0ZmZlNWMxYjRmOWU1NWY1NmMxNWFjNTM0ZTE:";
const DB_BASE_URL = process.env.NEXT_PUBLIC_DB_API_BASE_URL;
const AMEX_REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;

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

// local
// const base_url = "http://localhost:5003";
// const api_url = "http://localhost:5003/api";

// server // // //
const backend_url = "https://api-school.mangoitsol.com";
const base_url = "https://school.mangoitsol.com";
const api_url = "https://api-school.mangoitsol.com/api";
const auth_token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4";
export { api_url, auth_token, base_url, backend_url };

export {
  IS_CERT_AUTH_ENABLED,
  BASEURL,
  API_VERSION,
  USERNAME,
  PASSWORD,
  MERCHANTID,
  AMEX_TOKEN,
  DB_BASE_URL,
  AMEX_REDIRECT_URL,
};
