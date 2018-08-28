import fetchWrapper from '../util/fetch-wrapper';

export default ({nonce, id, password}) => fetchWrapper('/api/auth/change-password', {
    method: 'POST',
    body: {
        nonce,
        password,
        id
    }
});
