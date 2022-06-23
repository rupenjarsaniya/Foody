require('dotenv').config();
const express = require("express");
const cookieParse = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParse());
app.use(express.json());
require("./db/connection");
app.use(require('./router/root'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Foody Runnig At http://localhost:${port}`);
});