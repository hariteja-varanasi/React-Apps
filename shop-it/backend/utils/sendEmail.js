const nodemailer = require('nodemailer');
const MailJet = require('node-mailjet');
const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        service: 'SendinBlue', // no need to set host or port etc.
        auth: {
            user: 'harivars0000@gmail.com',
            pass: '9dVaWjYs0ORGp5B1'
        }
    });

    const message = {
        from: `noreply@shopit.com`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message);

    // let transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD
    //     }
    //   });

          // let transporter = nodemailer.createTransport({
          //   service: process.env.SMTP_GMAIL_SERVICE,
          //   auth: {
          //     user: process.env.SMTP_GMAIL_USER,
          //     pass: process.env.SMTP_PASSWORD
          //   }
          // });

    // let transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_GMAIL_HOST,
    //     port: process.env.SMTP_GMAIL_PORT,
    //     secure: process.env.SMTP_GMAIL_SECURE,
    //     auth: {
    //         user: process.env.SMTP_GMAIL_USER,
    //         pass: process.env.SMTP_GMAIL_PASSWORD
    //     }
    // });

    // let transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_GMAIL_HOST,
    //     port: process.env.SMTP_GMAIL_PORT,
    //     secure: process.env.SMTP_GMAIL_SECURE,
    //     auth: {
    //         type: "OAuth2",
    //         clientId: "814700582130-h9pvdmfjfntaev429biconhl9o6d1pue.apps.googleusercontent.com",
    //         clientSecret: "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",
    //     },
    // });
    //
    // const message = {
    //     from: `shopit@gmail.com`,
    //     to: options.email,
    //     subject: options.subject,
    //     text: options.message,
    //     auth: {
    //         user: "harivars0000@gmail.com",
    //         accessToken: "ya29.A0AVA9y1v5LUiyZOUl-UAb1VJkwOyehp4JlwoER1noXuxXjm-CBZDVh70KTEiiBv5E75oq-4u-cTKxe9kTFQxd2tDqYnd636iTrilxB94dLM1gy3dJ24b18pLj3XRzkq7J7AX5WNUqaJYZGc180XZlZWHQKiFGYUNnWUtBVEFTQVRBU0ZRRl91NjFWY3FLc2JxR01iUU1OTlFqdjVmNXZBQQ0163",
    //         expires: 3599,
    //     },
    // };

    // const mailJet = new MailJet({
    //     apiKey: 'ffcab5cee704c3f55b6d8c6c978686b8',
    //     apiSecret: '80bd4eb13d5e8b35320f74f77e61d8af'
    // });
    //
    // const request = await mailJet
    //     .post('send', { version: 'v3.1' })
    //     .request({
    //         Messages: [
    //             {
    //                 From: {
    //                     Email: `noreply@shopit.com`,
    //                     Name: "Shop It"
    //                 },
    //                 To: [
    //                     {
    //                         Email: options.email,
    //                         Name: options.email.substring(0, options.email.indexOf('@'))
    //                     }
    //                 ],
    //                 Subject: options.subject,
    //                 TextPart: options.message,
    //                 HTMLPart: `<h3>${options.message}</h3>`
    //             }
    //         ]
    //     });
    //
    // console.log("request is : ", request);

    // await request. ('success', function (response, body) {})
    //     .on('error', function (err, response) {});
}

module.exports = sendEmail;