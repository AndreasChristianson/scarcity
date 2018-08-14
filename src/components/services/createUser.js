import fetchWrapper from '../util/fetch-wrapper';

export default (user) => fetchWrapper('/api/create-user', {
    method: 'POST',
    body: user
});
