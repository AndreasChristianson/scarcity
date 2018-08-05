export default async (request, h) => {
    const id = await request.server.methods.createId();

    return h.response({
        id
    }).code(200);
};
