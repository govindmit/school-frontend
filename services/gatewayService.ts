// var request = require('request');
// import request from 'request'
var qs = require('qs');
import axios  from 'axios';
import {v4 as uuidv4} from 'uuid'
// import { getApiVersion, getBaseUrl, getMerchantId, getTestMerchantUrl, setAuthentication } from '../util/commonUtils';
// var {AMEX_TOKEN} = require('../helper/config');
import {IS_CERT_AUTH_ENABLED,AMEX_TOKEN,BASEURL,API_VERSION,MERCHANTID,DB_BASE_URL} from '../helper/config'

import commonUtils from '../util/commonUtils'
import cyberSourceSecureConfig from '../helper/cyberSourceSecureConfig'
const config :any ={
  IS_CERT_AUTH_ENABLED,
  BASEURL,
  API_VERSION,
  MERCHANTID,
  DB_BASE_URL,
  AMEX_TOKEN
}
class getwayService {
  
  getSession = async (requestData:any, callback:any) =>{
    console.log("AMEX_TOKEN =>",AMEX_TOKEN);
    var url = commonUtils.getTestMerchantUrl(config) + "/session";
    var data = JSON.stringify(requestData);
  
  var configData = {
    method: 'post',
    url : url,
    headers: { 
      'Authorization': `Basic ${AMEX_TOKEN}`, 
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
     
    },
    data : data
  };
  
  axios(configData)
  .then(function (response) {
    return callback(response);

  })
  .catch(function (error) {
    console.log(error);
    return callback(error);
  });
};


  retriveOrder = async (url:any, callback:any) =>{
    console.log(config.AMEX_TOKEN,"config.AMEX_TOKEN");
     var configData = {
      method: 'get',
      // url:'https://amexmena.gateway.mastercard.com/api/rest/version/62/merchant/TEST9767612138/order/EnXt3SGpT2',
      url:url,
      headers: { 
        'Authorization': `Basic ${config.AMEX_TOKEN}`,
        "Access-Control-Allow-Origin": "*"
      }
    };
    console.log(configData,"configData");
     axios(configData)
    .then(function (response) {
      console.log("response order ",response);
      return callback(response);
    })
    .catch(function (error) {
      console.log("error =>",error);
      return callback(error);
    });
}


 apiRequestBody =  async(apiOperation:any, data:any) =>{
  var returnObj :any= {
      "apiOperation": apiOperation
  }
  switch (apiOperation) {
     case "RETRIVE":
          returnObj.transaction = {
              "targetOrderId": data.orderId
          };
          break;

    
          
          default:
            // throwUnsupportedProtocolException();
            "Error in request body"
  }
  return returnObj;
}

 getRequestUrl = async (apiProtocol:any, request:any) =>{
  var base = commonUtils.getBaseUrl(config);
 
  switch (apiProtocol) {
      case "REST":

          var url = getApiBaseURL(base, apiProtocol) + "/version/" + commonUtils.getApiVersion(config) + "/merchant/" +commonUtils.getMerchantId(config) + "/order/" + request.orderId;
          if (request.transactionId) {
              url += "/transaction/" + request.transactionId;
          }
          return url;
      case "NVP":
          return getApiBaseURL(base, apiProtocol) + "/version/" + commonUtils.getApiVersion(config);
      default:
          // throwUnsupportedProtocolException();
          "Error in request body"
  }
  return null;
}

 

// cyber source secure
redirectCyberSourcePayment = async()=>{
  try{
    const currentDateTime = new Date().toISOString().split('.')[0]+"Z"
    const uniqId =  uuidv4()
    const refrensh__number = commonUtils.keyGen(4) ;
    console.log("uniq id ",commonUtils.keyGen(13));
    // console.log("uuid => ", uuidv4());
    // console.log("current date => ",currentDateTime);
//     const params : any ={
//       access_key:"cfc1af4483773756a54a990e585ce7c5",
//       profile_id:"70647EEB-EDE3-4859-9DD9-6E4605C9FABE",
//       req_profile_id:"70647EEB-EDE3-4859-9DD9-6E4605C9FABE",
//       ots_profileid:"70647EEB-EDE3-4859-9DD9-6E4605C9FABE",
//       merchant_id:"cbq_qis_qar",
//       transaction_uuid:"2f72a032-8e21-447f-bd07-0ed5fb1970e1",
//       signed_field_names:"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency",
//       unsigned_field_names:"",
//       signed_date_time:currentDateTime,
//       locale:"en",
//       transaction_type:"sale,create_payment_token",
//       reference_number:"SO5012",
//       amount:"40",
//       currency:"QAR"
  
// }
let data :any = {
  'access_key': 'cfc1af4483773756a54a990e585ce7c5',
  'profile_id': '70647EEB-EDE3-4859-9DD9-6E4605C9FABE',
  'req_profile_id': '70647EEB-EDE3-4859-9DD9-6E4605C9FABE',
  'ots_profileid': '70647EEB-EDE3-4859-9DD9-6E4605C9FABE',
  'merchant_id': 'cbq_qis_qar',
  // 'transaction_uuid': ,
  'transaction_uuid': "6401e70",
  'signed_field_names': 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency',
  'unsigned_field_names': '',
  'signed_date_time': currentDateTime,
  'locale': 'en',
  'transaction_type': 'sale,create_payment_token',
  // 'reference_number': refrensh__number,
  'reference_number':"1429",
  'amount': '300',
  'currency': 'QAR',
  'submit': 'Submit'
};



let signature =  await cyberSourceSecureConfig.sign(data);
console.log("signature =>",signature);
data['signature'] = signature;

const configData = qs.stringify(data)

var config = {
  method: 'post',
  url: 'https://testsecureacceptance.cybersource.com/pay',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
  },
  data : configData,
  withCredentials: false 
};

await axios(config)
.then(function (response) {
  console.log(response.data);
  return response.data
})
.catch(function (error) {
  console.log(error);
});



  }catch(error:any){
    console.log("error =>",error.message);
  }
}



transactionDataSaveInDB = async (data:any,callback:any) =>{
  var Tdata = JSON.stringify(data);
  var configData = {
    method: 'post',
    url: `${config.DB_BASE_URL}/createTransaction`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : Tdata
  };
  
  axios(configData)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    return callback(response.data);
  })
  .catch(function (error) {
    console.log(error);
    return callback(error);
  });
  
}

throwUnsupportedProtocolException = async() =>{
  throw "Unsupported API protocol!";
}

createAndApplyPaymentARInvoice = async(data:any,callback:any)=>{
  try{
   
    // var data = JSON.stringify({
    //   "customerId": "10381",
    //   "amount": 100,
    //   "ARpaymentMethod": "EFT",
    //   "referenceNumber": "RTC-000000002",
    //   "ARinvoiceRecordNumber": 1352
    // });
    var requestData = JSON.stringify(data);
    var configData = {
      method: 'post',
      // url: 'http://localhost:5003/api/AccountsReceivable/applyPayment',
      url: `${config.DB_BASE_URL}/AccountsReceivable/applyPayment`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : requestData
    };

    await axios(configData)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      return callback(response.data);
    })
    .catch(function (error:any) {
      console.log(error);
      return callback(error);
    });

  }catch(error){
    console.log("error =>",error);
  }
}

getARInoviceRecordNumber = async(sageIntacctARInvoiceID:any,callback:any)=>{
  try{
      console.log("sageIntacctARInvoiceID =>",sageIntacctARInvoiceID);
      var data = JSON.stringify({
        arInvoiceId: sageIntacctARInvoiceID
      });
      console.log("data =>",data);

      var configData = {
        method: 'post',
        // url: 'http://localhost:5003/api/AccountsReceivable/getARInvoiceRecordNo',
        url: `${config.DB_BASE_URL}/AccountsReceivable/getARInvoiceRecordNo`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    await axios(configData)
      .then(function (response:any) {
        console.log(JSON.stringify(response.data));
         return callback(response.data) ;
      })
      .catch(function (error:any) {
        console.log(error);
        return callback(error) ;
      });

  }catch(error){
    console.log("Error =>",error);
  }
}

generateRefrenceNumber = (DBTransactionId : any)=>{
 let gId = `${DBTransactionId?.toString()}`;    
  let tempRef = "RCT-000000000";
  let refrenceNumber = tempRef.slice(0,-gId.length);
  let finalGeneratedRefrenceNumber = refrenceNumber+gId ;
  console.log("finalGeneratedRefrenceNumber =>",finalGeneratedRefrenceNumber);
  return finalGeneratedRefrenceNumber
};

}
function getApiBaseURL (gatewayHost:any, apiProtocol:any){
  switch (apiProtocol) {
      case "REST":
          return gatewayHost + "/api/rest";
      case "NVP":
          return gatewayHost + "/api/nvp"
      default:
          // throwUnsupportedProtocolException();
          "Error in api base url function"
  }
  return null;
}
export default new getwayService();