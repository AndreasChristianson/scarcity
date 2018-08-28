import fetchWrapper from '../util/fetch-wrapper';

export default ({email}) => fetchWrapper('/api/auth/reset-password', {
    method: 'POST',
    body: {
        email
    }
});
