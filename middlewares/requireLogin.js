module.exports = (req, res, next) => {
  //next is something like done callback
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  //continue middleware chain if there is a user
  next();
};
