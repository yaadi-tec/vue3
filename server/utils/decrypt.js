const crypto = require('crypto');
const inetp = "192.168.10.1:8000";
const key = Buffer.from(process.env.ED_EK.substring(inetp.length), 'base64').toString('utf8');
const iv = Buffer.from(process.env.ED_EI.substring(inetp.length), 'base64').toString('utf8');

function decrypt(text) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports = decrypt;