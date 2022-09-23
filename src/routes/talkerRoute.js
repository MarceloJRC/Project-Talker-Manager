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
    const talkerData = await readFileTalker();
    return res.status(OK).json(talkerData);
});

talkerRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkerData = await readFileTalker();
    const resultById = talkerData.find((objTalker) => objTalker.id === Number(id));

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

talkerRoute.put('/:id',
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidate,
    talkValidationWatchedAt,
    talkValidationRate,
    async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkerData = await readFileTalker();
    const newUpdateTalker = talkerData.findIndex((talker) => talker.id === Number(id));
    let updatedTalker;

    for (let i = 0; i < talkerData.length; i += 1) {
        const talker = talkerData[i];

        if (talker.id === Number(id)) {
            talker.name = name;
            talker.age = age;
            talker.talk = talk;
            updatedTalker = talker;
        }
    }
    await newTalkerFile(newUpdateTalker);
    res.status(200).json({ updatedTalker });
});

talkerRoute.delete('/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    const talkerData = await readFileTalker();
    const talkerPosition = talkerData.findIndex((talker) => talker.id === Number(id));
    talkerData.splice(talkerPosition, 1);
    await newTalkerFile(talkerPosition);
    res.status(204).end();
});

module.exports = talkerRoute;
