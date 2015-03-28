var localhost = process.env.LOCALHOST || 'localhost';

module.exports = {

    port : 4242, // What port should this service handle

    sessionless : false, // Set True if you don't want to use a session

    verbose : false,

    reportGlobalVars : true,

    localkey : process.env.LOCALKEY || 'dev', 

    localhost : localhost,

    bodyParser : 'json', // What Kind of API is this [https://www.npmjs.com/package/body-parser]
    
    // Used For Session
    redis : {
      host: localhost,
      port: 6379,
      key : 'sess:'
    },

    cookie : {
      name : 'yourcookie.id',
      secret: 'Your session secret'
    },

    // MongoDB (Just Remove this entire key if you would like to run without mongo DB)
    mongodb : {
        host : localhost,
        port : 27017,
        database : 'yourdatabase'
    }

}