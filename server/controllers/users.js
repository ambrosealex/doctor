var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  getOneByName: function(req, res) {
      console.log("REQ PARAMS:", req.params.name);
      User.findOne({name:req.params.name}, function (err, user) {
          if(err){
              console.log(err);
          } else {
              console.log("GOT USER:", user);
          }
          res.json({ user: user });
      })
  },
  create: function(req, res) {
      var user = new User({
          name: req.body.name
      });
      user.save(function (err){
          if(err){
              console.log(err);
          } else {
              console.log("Successfully Saved:", user);
          }
          res.json({ user: user })
      })
  }
}
