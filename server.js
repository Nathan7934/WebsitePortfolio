// Acts as the main Express server file for the website portfolio

const express = require('express'); // Importing our npm dependencies
const path = require('path');

const app = express(); // Initialize the express server

app.use(express.static(path.join(__dirname, 'client/build'))); // Configuring our static middleware directory (the React app)

// A catchall handler. Sends the react app in response to all requests that don't match any API endpoints (there are none currently)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Portfolio listening on port ${port}...`);
})