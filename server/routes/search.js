const express = require('express');
const router = express.Router();

router.get('/:city', function(req,res) {
  const options = {'headers': {'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN}};
  fetch('https://api.yelp.com/v3/businesses/search?limit=50&term=bars&location=' + req.params.city, options)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
