import * as express from 'express';

// Middleware Imports
import { logger } from './middleware/logger.middleware';

//Handler Imports
import { noopRouteHandler } from './handlers/noop.handler';
import { echoRouteHandler } from './handlers/echo.handler';
import { marketDataRouteHandler } from './handlers/market-data.handler';
import { portfolioRouteHandler } from './handlers/portfolio.handler';

const app = express();

//Configure Middlewares
app.use(logger);

//Configure Route Handlers
app.use('*/noop', noopRouteHandler);
app.use('*/echo', echoRouteHandler);
app.use('*/market-data', marketDataRouteHandler);
app.use('*/portfolio', portfolioRouteHandler);

export default app;
