import express, { Application } from 'express';
import guestsController from './controllers/guests';
import messagesController from './controllers/messages';
import propertiesController from './controllers/properties';
import reservationsController from './controllers/reservations';

const app: Application = express();
const port = 3000;

app.use(express.json());

app.use('/guests', guestsController);
app.use('/messages', messagesController);
app.use('/properties', propertiesController);
app.use('/reservations', reservationsController);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
