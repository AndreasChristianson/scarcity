import fetchWrapper from '../util/fetch-wrapper';

export default (user) => fetchWrapper('/api/auth/create-user', {
    method: 'POST',
    body: user
});
