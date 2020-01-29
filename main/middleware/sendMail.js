const nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');

exports.sendEmailFunction = (details) => {
    /**
     * @description : create reusable transporter object using the default SMTP transport
     */
    console.log(details);
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'gaikwadr576@gmail.com',
            pass: 'Rohini@021'
        },
        tls: {
            rejectUnauthorized: false
        }
    }));
    /**
     * @description : setup e-mail data with unicode symbols
     */

    const mailOptions = {
            from: 'gaikwadr576@gmail.com',
            to: details.email,
            subject: 'Purchase Order Acceptance Letter',
            html: `<h1>eBookStore</h1>` +
                `<p> Hello ${details.userName},</p>` +
                '<p>Your order has been successfully placed!</p><br>' +
                '<h6>Order Details</h6>' +
                `<p>Title : ${details.title}</p>` +
                `<p>Order ID : ${details.orderId}</p>` +
                `<p>Book price : ${details.price}</p>` +
                `<p>Date : ${details.date}</p>`
        }
    ;
    /**
     * @description : send mail with defined transport object
     */
    transporter.sendMail(mailOptions, (err, info) => {
        try {
            if (err) throw err;
            else
                console.log('Information regarding the mail sent', info);
        } catch (err) {
            return err;
        }
    });
};