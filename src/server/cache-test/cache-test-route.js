import handler from './cache-test-handler';
var config = {
    plugins: {
        good: {
            suppressResponseEvent: true
        }
    }
};

export default ({
    method: 'GET',
    path: '/cache-test',
    handler,
    config
});
