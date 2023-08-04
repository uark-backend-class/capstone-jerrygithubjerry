export default function setAuthLocals (req, res, next)  {
    res.locals.user = req.user;
    console.log('setauth');
    console.log(res.locals.user);
    next();
};