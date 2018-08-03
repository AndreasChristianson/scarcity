export default async (request, session) => {
    const cached = await request.server.plugins.auth.sessionCache.get(session.sid);

    return {
        valid: Boolean(cached),
        credentials: cached
    };
};
