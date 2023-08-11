export default function setAuthLocals(req, res, next) {
    res.locals.user = req.user;
    next();
};