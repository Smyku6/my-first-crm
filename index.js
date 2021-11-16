const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require("path");

const {clientsDb} = require('./utils/db');
const {handlebarsHelpers} = require("./utils/handlebars-helpers");
const {handleError} = require("./utils/errors");


//ROUTERS
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");



//CREATE APP
const app = express();

//VIEW ENGINE
app.engine('.hbs', hbs(
    {
        extname: '.hbs',
        helpers: handlebarsHelpers,
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir  : [
            path.join(__dirname, 'views/partials'),
        ]
    }));
app.set('view engine', '.hbs');

//MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.static('public'));
app.use(express.json());

//ROUTING
app.use('/client', clientRouter);
app.use('/', homeRouter);


app.use(handleError);



app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});
