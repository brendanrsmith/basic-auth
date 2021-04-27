'use strict';

module.exports = (err, req, res, next) => {
  res.status(500).send('internal server error: 500');
}