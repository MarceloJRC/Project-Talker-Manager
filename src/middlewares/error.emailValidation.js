const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const emptyEmail = (email) => {
    if (!email) {
        return true;
    }
    return false;
};

const validEmail = (email) => emailRegex.test(email);

const emailValidation = (req, res, next) => {
    const { email } = req.body;
    try {
        if (emptyEmail(email)) throw new Error('O campo "email" é obrigatório');
        if (!validEmail(email)) throw new Error('O "email" deve ter o formato "email@email.com"');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = emailValidation;
