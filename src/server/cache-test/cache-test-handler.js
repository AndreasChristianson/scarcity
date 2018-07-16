export default async (request, h) => {
  const id =await  request.server.methods.createId();
  request.log('trace', `got an ID from the server method: ${id}`);
  return h.response({
    id
  }).code(200);
}
