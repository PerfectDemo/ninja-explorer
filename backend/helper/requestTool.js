const req = require('superagent');

exports.getQueryHtml = async function (url, p = 1, ps = 10) {
    try {
        const res = await req.get(url).query({ p, ps });
        return res.text;
    } catch (error) {
        throw new Error(`get html fail！message: ${error.message}`);
    }    
   // return res.text;
}