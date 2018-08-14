import healthRoute from './routes/health';
import staticRoutes from './routes/static';

export default [
    healthRoute,
    ...staticRoutes
];
