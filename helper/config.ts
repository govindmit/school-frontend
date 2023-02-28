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

const IS_CERT_AUTH_ENABLED = false ;
const BASEURL= process.env.NEXT_PUBLIC_TEST_GATEWAY_URL || "https://amexmena.gateway.mastercard.com";
const API_VERSION= process.env.NEXT_PUBLIC_API_VERSION || "62";
const USERNAME= 'merchant.' + process.env.NEXT_PUBLIC_USERNAME || "TEST9767612138";
const  PASSWORD=  "Aemempgs@1" ;
const  MERCHANTID=  "TEST9767612138";
const  AMEX_TOKEN = process.env.NEXT_PUBLIC_AMEX_TOKEN || "bWVyY2hhbnQuVEVTVDk3Njc2MTIxMzg6MDk0YmY0ZmZlNWMxYjRmOWU1NWY1NmMxNWFjNTM0ZTE:";
const DB_BASE_URL = process.env.NEXT_PUBLIC_DB_API_BASE_URL;
const AMEX_REDIRECT_URL =  process.env.NEXT_PUBLIC_REDIRECT_URL;
        
export {IS_CERT_AUTH_ENABLED,BASEURL,API_VERSION,USERNAME,PASSWORD,MERCHANTID,AMEX_TOKEN,DB_BASE_URL,AMEX_REDIRECT_URL}