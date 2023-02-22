// var request = require('request');
// import request from 'request'
import axios  from 'axios';

import { getTestMerchantUrl, setAuthentication } from '../util/commonUtils';
var config = require('../helper/config');

export async function getSession(requestData, callback) {
    var url = getTestMerchantUrl(config) + "/session";
    // var options = {
    //     method:"POST",
    //     url: url,
    //     data: requestData,
    //     headers: { 
    //             'Authorization': 'Basic bWVyY2hhbnQuVEVTVDk3Njc2MTIxMzg6MDk0YmY0ZmZlNWMxYjRmOWU1NWY1NmMxNWFjNTM0ZTE=',
    //             'Content-Type': 'application/json'
    //       },
    // };
    // setAuthentication(config, options);
 
    
//    request.post(options, function (error, response, body) {
//         return callback(body, error, response);
//     });
var data = JSON.stringify(requestData);
  
  var configData = {
    method: 'post',
    url: `https://amexmena.gateway.mastercard.com/api/rest/version/${config.TEST_GATEWAY.API_VERSION}/merchant/${config.TEST_GATEWAY.MERCHANTID}/session`,
    headers: { 
      'Authorization': 'Basic bWVyY2hhbnQuVEVTVDk3Njc2MTIxMzg6MDk0YmY0ZmZlNWMxYjRmOWU1NWY1NmMxNWFjNTM0ZTE=', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(configData)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return callback(response);
//     });
  })
  .catch(function (error) {
    console.log(error);
    return callback(error);
  });
}

export function retriveOrder(requestData, url, callback) {
    var options = {
        url: url,
    };
   setAuthentication(config, options);
    // request.get(options, function (error, response, body) {
    //     return callback({
    //         url: url,
    //         mthd: "GET",
    //         payload: requestData,
    //         resbody: body
    //     });
    // });
}


export function paymentResult(url, callback) {
    var options = {
        url: url,
    };
    setAuthentication(config, options);
    // request.get(options, function (error, response, body) {
    //     return callback(error, body);
    // });
}
