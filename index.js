const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
let mongoose = require('mongoose');


const docs = require('./docs');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

// app configs.

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(morgan("dev"));
app.use(cors());


mongoose.connect('mongodb://mongodb0.example.com:27017',  () => {
    console.info("Connected to database.");
});


app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));


//initialize the app.
async function initialize() {
    app.listen(PORT);
}

initialize().finally(() => console.log(`app started on port:${PORT}`));