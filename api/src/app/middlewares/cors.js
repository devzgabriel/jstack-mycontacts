module.exports = (req, res, next) => {
  res.setHeader('Cross-Origin-Allow-Methods', 'http://localhost:3000');
  res.setHeader('Cross-Origin-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Allow-Headers', '*');
  next();
};
