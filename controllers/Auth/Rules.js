const registerValidationRules = {
    name: "required|min:3|max:10",
    email: "required|email",
    password: "required|min:6|max:16"
};

const loginValidationRules = {
    email: "required|email",
    password: "required"
};

module.exports = {registerValidationRules, loginValidationRules};
