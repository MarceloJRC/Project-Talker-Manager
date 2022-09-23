const fs = require('fs').promises;

const fileName = 'src/talker.json';

const readFileTalker = async () => {
    try {
        const response = await fs.readFile(fileName, 'utf-8');
        const talkers = JSON.parse(response);
        return talkers;
    } catch (error) {
        return (`Erro: ${error}`);
    }
};

const newTalkerFile = async (newTalkers) => {
    await fs.writeFile(fileName, JSON.stringify(newTalkers));
};

module.exports = { readFileTalker, newTalkerFile };