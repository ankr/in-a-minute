import express, { Application } from 'express';
import guestsController from './controllers/guests';
import messagesController from './controllers/messages';
import propertiesController from './controllers/properties';
import reservationsController from './controllers/reservations';

/**
 * Create a new instance of the main express application
 *
 * This function can reused in testing.
 */
export const createApp = () => {
  const app: Application = express();

  app.use(express.json());

  app.use('/guests', guestsController);
  app.use('/messages', messagesController);
  app.use('/properties', propertiesController);
  app.use('/reservations', reservationsController);

  return app;
};
