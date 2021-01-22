import './common/env';
import l from './common/logger';
import Server from './common/server';
import routes from './routes';
const port = parseInt(process.env.PORT);
const app = new Server().router(routes).listen(port);
export default app;
app.then();
