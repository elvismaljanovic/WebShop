import nodemailer from 'nodemailer'
const { EMAIL, PASSWORD } = require("./config");
  export   const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        // ignoreTLS: false,
        auth:{
            user:EMAIL,
            pass:PASSWORD                 
        }
    })
