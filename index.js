require('dotenv').config()
var requestify = require('requestify');

var BASE_URL = 'https://api.ote-godaddy.com/v1/domains/available';
var API_OPTIONS = {
    headers: {
        accept: 'application/json',
        'Authorization': 'sso-key ' + process.env.GODADDY_API_KEY
    }

};
/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.godaddyProxy = function godaddyProxy(req, res) {
    
    if (!req.query.domain) {
        res.status(401).json({ error: 'domain not defined' });
        return;
    }

    var url = BASE_URL + '?domain=' + req.query.domain + '&checkType=FAST&forTransfer=false';
    requestify
        .get(url, API_OPTIONS)
        .then(function (fres) {
            res
                .set('Access-Control-Allow-Origin', process.env.ALLOWED_DOMAIN || '*')
                .set('Access-Control-Allow-Methods', 'GET')
                .status(200).json(fres.getBody());
        })
        .catch(function (err) {
            res.status(400).json(err);
            console.log(err);
        });
    
};