const responseFormatter = (req, res, next) => {
    const oldJson = res.json;
    res.json = function (data) {
        oldJson.call(this, { data, status: res.statusCode });
    };
    next();
};

module.exports = responseFormatter;