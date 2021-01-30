const { Op } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function basicDetails(obj) {
    const { id, name } = obj;
    return { id, name };
}

async function create(params) {
    if (await db.Country.findOne({ where: {name: params.name} })) {
        throw 'País Agregado';
    }

    const obj = new db.Country(params);
    obj.verified = Date.now();

    await obj.save();

    return basicDetails(obj);
}

async function update(id, params) {
    const obj = await getObject(id);

    Object.assign(obj, params);
    obj.updated = Date.now();
    await obj.save();

    return basicDetails(obj);
}

async function _delete(id) {
    const obj = await getObject(id);
    await obj.destroy();
}

async function getObject(id) {
    const obj = await db.Country.findByPk(id);
    if (!obj) throw 'No encontrado';
    return obj;
}

async function getAll() {
    const objs = await db.Country.findAll();
    return objs.map(x => basicDetails(x));
}

async function getById(id) {
    const obj = await getObject(id);
    return basicDetails(obj);
}