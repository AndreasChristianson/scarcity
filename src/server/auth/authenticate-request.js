export default async (request, session) => ({
    valid: session.exp > Date.now().valueOf(),
    credentials: session
});
