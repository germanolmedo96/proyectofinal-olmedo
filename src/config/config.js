import dotenv from 'dotenv'; 

dotenv.config(); 

export default {
    mongoUrl: process.env.MONGO_URL,
    mongoUrlTesting: process.env.MONGO_URL_TESTING,
    secret: process.env.SECRET,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,

    service: process.env.SERVICE,
    port: process.env.PORT,
    user: process.env.USER,
    pass: process.env.PASS,
    emailTo: process.env.EMAILTO

}