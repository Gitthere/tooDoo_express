var express = require('express');
var router = express.Router();

// router.use(function(req,res,next) {
//   if(!req.user){
//     res.redirect('/users/login');
//   }
// //   next();
// });

router.get('/',function(req, res) {
  res.send('Index Page');//do you want to sign in?
});

module.exports = router;