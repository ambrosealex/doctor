// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create the schema
var AppointmentSchema = new mongoose.Schema({
  date: Date,
  time: Date,
  complaint: String,
  period: String,
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})
// register the schema as a model
var Appointment = mongoose.model('Appointment', AppointmentSchema);
