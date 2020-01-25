const nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');

exports.sendEmailFunction = (data, email) => {

    /**
     * @description : create reusable transporter object using the default SMTP transport
     */
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'abcd@gmail.com',
            pass: '*********'
        },
        tls: {
            rejectUnauthorized: false
        }
    }));
    /**
     * @description : setup e-mail data with unicode symbols
     */
    const mailOptions = {
        from: 'abcd@gmail.com',
        to: email,
        subject: 'Purchase Order Acceptance Letter',
        text: 'Tall Tales Book Shop\n' +
            'Tall Tales Book Shop\n' +
            'Malhotra Chambers,\n' +
            'First Floor, Govandi East,\n' +
            'Mumbai, Maharashtra 400088\n' +
            '[Date]\n' +
            'Dear Manager,\n' +
            'Hurray another order placed for us.\n' +
            'Following is the order details to be completed.\n' +
            'Order number | Order date | Recipient Name\n' +
            'Sincerely,\n' +
            'Tall Tales Book Shop\n' +
            'tall-tales-book@gmail.com\n' +
            '| book name | quantity | book price'
    };
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
}