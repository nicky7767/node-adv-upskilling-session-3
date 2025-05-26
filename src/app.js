import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import itemRoutes from './routes/itemRoutes.js';
import { connectDB } from './config/db.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = new Koa();

connectDB();

app.use(errorHandler);
app.use(logger);
app.use(bodyParser());
app.use(itemRoutes.routes()).use(itemRoutes.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('Server Error:', err.message);
});

export default app;
