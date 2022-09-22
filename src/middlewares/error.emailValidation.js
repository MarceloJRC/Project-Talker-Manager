const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

const emptyEmail = (email) => {
    if (!email || email === '' || email === null) {
        return true;
    }
    return false;
};

const validEmail = (email) => emailRegex.test(email);

const emailValidation = (req, res, next) => {
    const { email } = req.body;

        if (emptyEmail(email)) throw new Error('O campo "email" é obrigatório');
        if (!validEmail(email)) throw new Error('O "email" deve ter o formato "email@email.com"');
    next();
};

module.exports = emailValidation;
