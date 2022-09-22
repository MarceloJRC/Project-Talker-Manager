const emptyPassword = (password) => {
    if (!password) {
        return true;
    }
    return false;
};

const validPassword = (password) => {
    if (password.length < 6) {
        return false;
    }
    return true;
};

const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    try {
        if (emptyPassword(password)) throw new Error('O campo "password" é obrigatório');
        if (!validPassword(password)) {
            throw new Error('O "password" deve ter pelo menos 6 caracteres'); 
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = passwordValidation;