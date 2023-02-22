import  fs from 'fs'
var config = require('../helper/config');

export function keyGen(keyLength) {
    var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (i = 0; i < keyLength; i++) {
        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }
    return key;
}

export function getCurrency(keyLength) {
    return config.CURRENCY;
}
export function setAuthentication(config, options) {
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
}

export function getBaseUrl(config) {
    return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.BASEURL : config.TEST_GATEWAY.BASEURL;
}
export function getApiVersion(config) {
    return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.API_VERSION : config.TEST_GATEWAY.API_VERSION;
}
export function getMerchantId(config) {
    return (config.IS_CERT_AUTH_ENABLED) ? config.PKI_GATEWAY.MERCHANTID : config.TEST_GATEWAY.MERCHANTID;
}

export function getPkiMerchantUrl(config) {
    return getBaseUrl(config) + "/api/rest/version/" + config.PKI_GATEWAY.API_VERSION + "/merchant/" + config.PKI_GATEWAY.MERCHANTID;
}

export function getTestMerchantUrl(config) {
    return getBaseUrl(config) + "/api/rest/version/" + config.TEST_GATEWAY.API_VERSION + "/merchant/" + config.TEST_GATEWAY.MERCHANTID;
}



// module.exports = {
//     keyGen: keyGen,
//     getCurrency: getCurrency,
//     setAuthentication: setAuthentication,
//     getBaseUrl: getBaseUrl,
//     getApiVersion: getApiVersion,
//     getMerchantId: getMerchantId,
//     getTestMerchantUrl: getTestMerchantUrl,
//     getPkiMerchantUrl: getPkiMerchantUrl
   
// }
// module.exports = {keyGen}