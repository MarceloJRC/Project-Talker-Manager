const emptyTalk = (talk) => {
    if (!talk) {
        return true;
    }
    return false;
};

const talkValidate = (req, res, next) => {
    const { talk } = req.body;
    try {
        if (emptyTalk(talk)) throw new Error('O campo "talk" é obrigatório');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

const watchedAtRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const emptyWatchedAt = (watchedAt) => {
    if (!watchedAt) {
        return true;
    }
    return false;
};

const validWatchedAt = (watchedAt) => watchedAtRegex.test(watchedAt);

const talkValidationWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    try {
        if (emptyWatchedAt(watchedAt)) throw new Error('O campo "watchedAt" é obrigatório');
        if (!validWatchedAt(watchedAt)) {
            throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'); 
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

const emptyRate = (rate) => {
    if (!rate) {
        return true;
    }
    return false;
};

const validRate = (rate) => {
    console.log(rate);
    if (rate < 6 && rate >= 1) {
        return true;
    }
    return false;
};

const talkValidationRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    try {
        if (emptyRate(rate)) throw new Error('O campo "rate" é obrigatório');
        if (!validRate(rate)) {
            throw new Error('O campo "rate" deve ser um inteiro de 1 à 5'); 
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { talkValidationWatchedAt, talkValidationRate, talkValidate };