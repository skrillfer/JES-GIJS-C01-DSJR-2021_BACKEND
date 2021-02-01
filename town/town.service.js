const { Op } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    getByCondition,
    delete: _delete
};

function basicDetails(obj) {
    const { id, name } = obj;
    return { id, name };
}

async function create(params) {
    if (await db.Town.findOne({ where: {name: params.name} })) {
        throw 'Municipio Agregado';
    }

    const obj = new db.Town(params);
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
    const obj = await db.Town.findByPk(id);
    if (!obj) throw 'No encontrado';
    return obj;
}

async function getAll() {
    const objs = await db.Town.findAll();
    return objs.map(x => basicDetails(x));
}

async function getById(id) {
    const obj = await getObject(id);
    return basicDetails(obj);
}
async function getByCondition(condition) {
    const objs = await db.Town.findAll({
        condition
    });
    return objs.map(x => basicDetails(x));
}