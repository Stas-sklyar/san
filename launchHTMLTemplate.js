const express = require('express');
const path = require('path');
const globals = require("./config");

const app = express();

app.use(express.static(path.join(__dirname, 'template')));
app.listen(globals.portForLaunchHTMLTemplate, () => {
    console.log(`Server for launch HTML template running on port ${globals.portForLaunchHTMLTemplate}`)
});