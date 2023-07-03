require("dotenv").config()



const ENV = {
    APP_NAME:process.env.APP_NAME,
    APP_PORT:process.env.APP_PORT,
    APP_LOGS:process.env.APP_LOGS,

    // DATABASE
    DB_URI:process.env.DB_URI,

    // 

}


module.exports = ENV