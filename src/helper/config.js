 var  CONFIG = {};
CONFIG.JWT = {
    SECRET: 'TEST_SECRET'
}
CONFIG.MODE = 'DEV';
CONFIG.PROD_MODE = CONFIG.MODE === 'DEV' ? false: true;
CONFIG.IS_CERT_AUTH_ENABLED = false;
CONFIG.CURRENCY= process.env.REACT_APP_CURRENCY_LABEL || "QAR";
CONFIG.TEST_GATEWAY = {
    BASEURL: process.env.REACT_APP_TEST_GATEWAY_URL || "https://amexmena.gateway.mastercard.com",
    API_VERSION: process.env.REACT_APP_API_VERSION || "62",
    // USERNAME: 'merchant.' + process.env.USERNAME || "TEST9767612138",
    USERNAME: "merchant.TEST9767612138",
    PASSWORD:  "Aemempgs@1" ,
    MERCHANTID:  "TEST9767612138"
};
CONFIG.PKI_GATEWAY = {
    BASEURL: process.env.REACT_APP_BASEURL || "https://amexmena.gateway.mastercard.com" ,
    API_VERSION: process.env.REACT_APP_API_VERSION || "62",
    // MERCHANTID:process.env.USERNAME || "TESTUSER"
    MERCHANTID:"TESTUSER"
}
CONFIG.WEBHOOKS = {
    WEBHOOKS_NOTIFICATION_SECRET : process.env.REACT_APP_WEBHOOKS_NOTIFICATION_SECRET,
    WEBHOOKS_NOTIFICATION_FOLDER : 'webhooks-notifications'
}
CONFIG.SSL_FILES = {
    CRT: process.env.REACT_APP_SSL_CRT_PATH,
    KEY: process.env.REACT_APP_SSL_KEY_PATH
}
module.exports = CONFIG;