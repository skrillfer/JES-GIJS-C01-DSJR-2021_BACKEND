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
    if (await db.Department.findOne({ where: {name: params.name} })) {
        throw 'Departamento Agregado';
    }

    const obj = new db.Department(params);
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
    const obj = await db.Department.findByPk(id);
    if (!obj) throw 'No encontrado';
    return obj;
}

async function getAll() {
    db.Department.hasMany(db.Town, {foreignKey: 'departmentId'})
    db.Town.belongsTo(db.Department, {foreignKey: 'departmentId'})
    
    const objs = await db.Department.findAll({include: [{model: db.Town}]});
    return objs.map(x => {
        return { 
            ...basicDetails(x),
            towns: x.towns
        }
    });
}

async function getById(id) {
    const obj = await getObject(id);
    return basicDetails(obj);
}