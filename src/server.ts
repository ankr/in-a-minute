// Code to start the server.
//
// This is separate from the createApp function so that the server
// can be started in a separate file for testing purposes.
import { createApp } from './app';

const port = process.env.PORT ?? 3000;

// Start the server immediately when `npm start` is run
const app = createApp();
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
