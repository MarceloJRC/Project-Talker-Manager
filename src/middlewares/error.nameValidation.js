const emptyName = (name) => {
    if (!name) {
        return true;
    }
    return false;
};

const validName = (name) => {
    if (name.length < 3) {
        return false;
    }
    return true;
};

const nameValidation = (req, res, next) => {
    const { name } = req.body;
    try {
        if (emptyName(name)) throw new Error('O campo "name" é obrigatório');
        if (!validName(name)) {
            throw new Error('O "name" deve ter pelo menos 3 caracteres'); 
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { nameValidation };