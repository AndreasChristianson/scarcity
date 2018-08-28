import querystring from 'querystring';
import config from 'config';

import emailTransport from '../../email/email-transport';
import logger from '../../../logger';

export default async (user, nonce) => {
    const resetLink = `${config.get('server.host')}/page/change-password?${querystring.stringify({nonce})}`;

    await emailTransport.sendMail({
        from: config.get('email.from'),
        to: user.email,
        subject: 'Scarcity: password reset link',
        text: `User: ${user.name}\nReset link: ${resetLink}\nNote that this url is valid for 24 hours.`
    });
    logger.debug(`Reset password link sent to [${user.email}].`);
};
