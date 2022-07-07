const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // let transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD
    //     }
    //   });

      /*let transporter = nodemailer.createTransport({
        service: process.env.SMTP_GMAIL_SERVICE,        
        auth: {
          user: process.env.SMTP_GMAIL_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });*/

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_GMAIL_HOST,
        port: process.env.SMTP_GMAIL_PORT,
        secure: process.env.SMTP_GMAIL_SECURE,
        auth: {
            user: process.env.SMTP_GMAIL_USER,
            pass: process.env.SMTP_GMAIL_PASSWORD
        }
    });

      const message = {
        from: `noreply@shopit.com`,
        to: options.email,
        subject: options.subject,
        text: options.message
      }

      await transporter.sendMail(message);
}

module.exports = sendEmail;