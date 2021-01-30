const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

const service = require('./town.service');

// routes
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.get('/', getAll);
router.get('/:id',  getById);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        departmentId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    service.create(req.body)
        .then(obj => res.json(obj))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        name: Joi.string().empty()
    };

    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    service.update(req.params.id, req.body)
        .then(obj => res.json(obj))
        .catch(next);
}

function _delete(req, res, next) {
    service.delete(req.params.id)
        .then(() => res.json({ message: 'Eliminado Correctamente' }))
        .catch(next);
}

function getAll(req, res, next) {
    service.getAll()
        .then(obj=> res.json(obj))
        .catch(next);
}

function getById(req, res, next) {
    service.getById(req.params.id)
        .then(obj => obj ? res.json(obj) : res.sendStatus(404))
        .catch(next);
}
