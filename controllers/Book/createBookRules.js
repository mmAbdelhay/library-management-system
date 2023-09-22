const createBookRules = {
    "title": "required|string",
    "ISBN": "required|string",
    "quantity": "required|numeric",
    "shelfLocation": "required|string",
    "author": "required|string",
};

module.exports = createBookRules;