// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create the schema
var UserSchema = new mongoose.Schema({
  name: String,
  appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}]
}, {timestamps: true})
// register the schema as a model
var User = mongoose.model('User', UserSchema);
