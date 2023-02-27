import  fs from 'fs'
// var config = require('../helper/config');
// var config = require('../helper/config');
import config from '../helper/config'
class commonUtils {
   

    keyGen = (keyLength) => {
        var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var charactersLength = characters.length;
        for (i = 0; i < keyLength; i++) {
            key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
        }
        return key;
    };
    
    getCurrency=(keyLength)=> {
        return config.CURRENCY;
    };
   setAuthentication = (config, options)=> {
        if (config.IS_CERT_AUTH_ENABLED === 'true') {
            options.agentOptions = {
                cert: fs.readFileSync(config.SSL_FILES.CRT),
                key: fs.readFileSync(config.SSL_FILES.KEY),
                passphrase: config.PKI_GATEWAY.MERCHANTID
            }
        } else {
            options.auth = {
                // user: config.TEST_GATEWAY.USERNAME,
                // pass: config.TEST_GATEWAY.PASSWORD,
                user: "merchant.TEST9767612138",
                pass: "094bf4ffe5c1b4f9e55f56c15ac534e1",
                sendImmediately: false
            };
        }
    };
    
    getBaseUrl=(config) =>{
        console.log("config base",config.TEST_GATEWAY.BASEURL);
        return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.BASEURL : config.TEST_GATEWAY.BASEURL;
    };
     getApiVersion =(config) =>{
        return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.API_VERSION : config.TEST_GATEWAY.API_VERSION;
    };
     getMerchantId =(config) =>{
        return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.MERCHANTID : config.TEST_GATEWAY.MERCHANTID;
    };
    
     getPkiMerchantUrl =(config) =>{
        return getSelfBaseUrl(config) + "/api/rest/version/" + config.PKI_GATEWAY.API_VERSION + "/merchant/" + config.PKI_GATEWAY.MERCHANTID;
    };
    
    getTestMerchantUrl =(config) =>{
        return getSelfBaseUrl(config) + "/api/rest/version/" + config.TEST_GATEWAY.API_VERSION + "/merchant/" + config.TEST_GATEWAY.MERCHANTID;
    };

}

function getSelfBaseUrl(config){
    return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.BASEURL : config.TEST_GATEWAY.BASEURL;
}

export default new commonUtils();