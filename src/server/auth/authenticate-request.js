export default async (request, session) => {
    const {locked = true} = await request.server.methods.getUserById(session.user.id) || {};

    return {
        valid: session.exp > Date.now().valueOf() && !locked,
        credentials: session
    };
};
