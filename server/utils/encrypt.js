const crypto = require('crypto');
const inetp = "192.168.10.1:8000";
const key = Buffer.from(process.env.ED_EK.substring(inetp.length), 'base64').toString('utf8');
const iv = Buffer.from(process.env.ED_EI.substring(inetp.length), 'base64').toString('utf8');

function encrypt(text) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var enc = cipher.update(text, "utf8", 'base64');
    enc += cipher.final('base64');
    return enc;
}

module.exports = encrypt;