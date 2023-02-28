// var request = require('request');
// import request from 'request'
import axios  from 'axios';

// import { getApiVersion, getBaseUrl, getMerchantId, getTestMerchantUrl, setAuthentication } from '../util/commonUtils';
// var {AMEX_TOKEN} = require('../helper/config');
import {IS_CERT_AUTH_ENABLED,AMEX_TOKEN,BASEURL,API_VERSION,MERCHANTID,DB_BASE_URL} from '../helper/config'

import commonUtils from '../util/commonUtils'
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
      'Content-Type': 'application/json'
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
        'Authorization': `Basic ${config.AMEX_TOKEN}`
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
    console.log(JSON.stringify(response.data));
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