export default (request, session) => ({
    valid: session.exp > Date.now().valueOf(),
    credentials: session
});
