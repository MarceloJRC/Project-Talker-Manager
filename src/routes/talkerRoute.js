const express = require('express');
const { readFileTalker, newTalkerFile } = require('../utils/talkerFS');
const { tokenValidation } = require('../middlewares/error.tokenValidation');
const { nameValidation } = require('../middlewares/error.nameValidation');
const { ageValidation } = require('../middlewares/error.ageValidation');
const { 
    talkValidationWatchedAt,
    talkValidationRate,
    talkValidate, 
} = require('../middlewares/error.talkValidation');

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

talkerRoute.post('/', 
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidate,
    talkValidationWatchedAt,
    talkValidationRate,
    async (req, res) => {
    const list = req.body;
    const talkerData = await readFileTalker();
    const newTalker = { id: talkerData.length + 1, ...list };
    talkerData.push(newTalker);
    await newTalkerFile(talkerData);
    res.status(201).json(newTalker);
});

module.exports = talkerRoute;
