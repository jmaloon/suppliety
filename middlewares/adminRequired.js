module.exports = (req, res, next) => {
  if (!(req.user && req.user.admin)) {
    res.status(401).send('Not Authorized');
  }
  next();
};
