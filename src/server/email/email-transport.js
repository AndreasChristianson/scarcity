import config from 'config';

import mailer from 'nodemailer';

export default mailer.createTransport({
    host: config.get('email.host'),
    port: config.get('email.port'),
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.get('email.user'), // generated ethereal user
        pass: config.get('email.password') // generated ethereal password
    }
});

