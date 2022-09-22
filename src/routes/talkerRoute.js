const express = require('express');
const { readFileTalker } = require('../utils/talkerFS');

const talkerRoute = express();

const OK = 200;
const NOT_FOUND = 404;

talkerRoute.get('/', async (req, res) => {
    const result = await readFileTalker();
    return res.status(OK).json(result);
});

talkerRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await readFileTalker();
    const resultById = result.find((objTalker) => objTalker.id === Number(id));

    if (resultById) {
        return res.status(OK).json(resultById);
    }
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRoute;
