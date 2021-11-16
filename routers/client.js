const express = require('express');
const {clientsDb} = require("../utils/db");
const {ClientRecord} = require("../records/clients-record");
const {NotFoundError} = require("../utils/errors");


const clientRouter = express.Router();

clientRouter
    //CREATE
    .post('/', (req, res) => {
        // READ VALUES FROM ADD-FORM (req.body)
        const {name, mail, notes, nextContactAt} = req.body;
        res
            .status(201)
            .render('client/added', {
            client: {
                // id: clientsDb.getAll().pop().id,
                id: clientsDb.create({name, mail, notes, nextContactAt}),
                name
            }
        });
    })
    //READ ALL CLIENTS
    .get('/', (req, res) => {
        res.render('client/show-all', {
            clients: clientsDb.getAll(),
        });
    })
    //READ ONLY ONE BY ID
    .get('/:id', (req, res) => {
        const client = clientsDb.getOne(req.params.id);

        if(!client) {
            throw new NotFoundError();
        }

        res.render('client/show-one', {
            client
        });
    })
    //UPDATE
    .put('/:id', (req, res) => {
        // READ VALUES FROM EDIT-FORM (req.body)
        const {name, mail, notes, nextContactAt} = req.body;
        clientsDb.update(req.params.id, {
            name,
            mail,
            notes,
            nextContactAt,
        });
        res.render('client/updated', {
            client: clientsDb.getOne(req.params.id)
        })
    })
    //DELETE
    .delete('/:id', (req, res) => {
        const client = clientsDb.getOne(req.params.id);
        if(!client) {
            throw new NotFoundError();
        }
        clientsDb.delete(req.params.id);
        res.render('client/deleted', {
            client,
        });
    })
    //VIEW OF CREATE FORM
    .get('/form/add', (req, res) => {
        res.render('client/forms/add')
    })

    //VIEW OF EDIT FORM
    .get('/form/edit/:id', (req, res) => {
        const client = clientsDb.getOne(req.params.id);

        if(!client) {
            throw new NotFoundError();
        }

        res.render('client/forms/edit', {
            client: client,
        })
    })


module.exports = {
    clientRouter,
}
