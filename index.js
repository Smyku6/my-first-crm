const express = require('express');
const hbs = require('express-handlebars');
const path = require("path");
const {db} = require('./utils/db');


//ROUTERS
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");


//CREATE APP
const app = express();

//VIEW ENGINE
app.engine('.hbs', hbs(
    {
        extname: '.hbs',
        // helpers: handlebarsHelpers,
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir  : [
            path.join(__dirname, 'views/partials'),
        ]
    }));
app.set('view engine', '.hbs');

//MIDDLEWARE
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.static('public'));
app.use(express.json());

//ROUTING
app.use('/client', clientRouter);
app.use('/', homeRouter);


app.get('/', (req,res) => {
    res.render('test');
})

app.get('/testing', (req,res) => {
    res.json(db.getAll());
})


app.get('/update', (req,res) => {
    db.update("78522347-30ae-4a10-8624-ee9fd5622e5a", { jajco: 'kupalnocka'})
    res.send('update succes');
})

app.get('/delete', (req,res) => {
    db.delete("7852342347-30a21e-4a10-8624-ee9fd5622e5a")
    res.send('delete success');
})

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});
