const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(express.json())
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    console.log(req.body)
    // Send the JWT token to the frontend
    res.json(JSON.stringify(req.body));
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});