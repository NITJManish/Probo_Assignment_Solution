const express = require('express');
const app = express();
const dotenv=require("dotenv");
const stockRoute=require("./route/stockRoute");
dotenv.config({ path: "backend/config/config.env" });


// API endpoint for getting current stock price
app.use('/api', stockRoute);

// Start server
const port = 3000;
app.listen(port, (err) => {
    if(!err)
    console.log(`Server running on port ${port}`);
});
