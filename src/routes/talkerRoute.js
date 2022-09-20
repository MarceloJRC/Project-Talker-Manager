const express = require('express');
const { readFileTalker } = require('../utils/talkerFS');

const talkerRoute = express();

talkerRoute.get('/', async (req, res) => {
    const result = await readFileTalker();
    return res.status(200).json(result);
});

module.exports = talkerRoute;
