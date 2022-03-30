module.exports = (req, res, next) => {
  res.setHeader('Cross-Origin-Allow-Origin', 'http://localhost:3000');
  next();
};
