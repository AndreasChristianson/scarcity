import fetchWrapper from '../util/fetch-wrapper';

export default ({nonce, id, password}) => fetchWrapper('/api/reset-password', {
    method: 'POST',
    body: {
        nonce,
        password,
        id
    }
});
