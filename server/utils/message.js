const moment = require('moment');

const generateMessage = (from, text) => {
    return { from, text, createdAt: moment().format('l') }
}

module.exports = { generateMessage }
