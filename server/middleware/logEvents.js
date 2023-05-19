const logEvents = (msg) => {
    console.log(msg);
}

const logger = (req, res, next) => {
    const msg = `${req.method},${req.headers.origin},${req.url}`;
    logEvents(req);
    next();
}

module.exports = { logger, logEvents };
