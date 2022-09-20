const fs = require('fs').promises;

const fileName = 'src/talker.json';

const readFileTalker = async () => {
    try {
        const response = await fs.readFile(fileName, 'utf-8');
        const talkers = JSON.parse(response);
        return talkers;
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
};

module.exports = { readFileTalker };