import config from 'config';

export default ()=>{
  const port= config.get('server.options.port');
  const options = {
    port
  };
  if(config.has('server.options.cache')){
    options.cache=config.get('server.options.cache');
  }
  return options;
}
