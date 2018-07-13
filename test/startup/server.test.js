import serverGenerator from '../../src/server/server-generator';

describe('serger generator',()=>{
  let server;

  beforeEach(async ()=>{
    server = await serverGenerator();
  });

  it('should load the logging plugin',()=>{
    expect(server.registrations['scarcity-logging'].version).toBe('1.0.0');
  });
});