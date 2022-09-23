const emptyAge = (age) => {
    if (!age) {
        return true;
    }
    return false;
};

const validAge = (age) => {
    if (age % 1 === 0 && age < 18) {
        return false;
    }
    return true;
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;
    try {
        if (emptyAge(age)) throw new Error('O campo "age" é obrigatório');
        if (!validAge(age)) {
            throw new Error('A pessoa palestrante deve ser maior de idade'); 
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { ageValidation };