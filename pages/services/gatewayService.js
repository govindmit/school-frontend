// var request = require('request');
// import request from 'request'
import axios  from 'axios';

// import { getApiVersion, getBaseUrl, getMerchantId, getTestMerchantUrl, setAuthentication } from '../util/commonUtils';
var config = require('../helper/config');
import commonUtils from '../util/commonUtils'

class getwayService {
  
  getSession = async (requestData, callback) =>{
    var url = commonUtils.getTestMerchantUrl(config) + "/session";
    var data = JSON.stringify(requestData);
  
  var configData = {
    method: 'post',
    url : url,
    headers: { 
      'Authorization': `Basic ${config.TEST_GATEWAY.AMEX_TOKEN}`, 
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


  retriveOrder = async (url, callback) =>{
    console.log(config.TEST_GATEWAY.AMEX_TOKEN,"config.TEST_GATEWAY.AMEX_TOKEN");
     var configData = {
      method: 'get',
      // url:'https://amexmena.gateway.mastercard.com/api/rest/version/62/merchant/TEST9767612138/order/EnXt3SGpT2',
      url:url,
      headers: { 
        'Authorization': `Basic ${config.TEST_GATEWAY.AMEX_TOKEN}`
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


 apiRequestBody =  async(apiOperation, data) =>{
  var returnObj = {
      "apiOperation": apiOperation
  }
  switch (apiOperation) {
     case "RETRIVE":
          returnObj.transaction = {
              "targetOrderId": data.orderId
          };
          break;

    
          
          default:
            throwUnsupportedProtocolException();
  }
  return returnObj;
}

 getRequestUrl = async (apiProtocol, request) =>{
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
          throwUnsupportedProtocolException();
  }
  return null;
}

 


transactionDataSaveInDB = async (data,callback) =>{
  var Tdata = JSON.stringify(data);
  var configData = {
    method: 'post',
    url: `${config.TEST_GATEWAY.DB_BASE_URL}/createTransaction`,
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
function getApiBaseURL (gatewayHost, apiProtocol){
  switch (apiProtocol) {
      case "REST":
          return gatewayHost + "/api/rest";
      case "NVP":
          return gatewayHost + "/api/nvp"
      default:
          throwUnsupportedProtocolException();
  }
  return null;
}
export default new getwayService();