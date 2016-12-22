// here we load the Appointment and User model
var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/users.js');
var Appointment = mongoose.model('Appointment');
var appointments = require('../controllers/appointments.js');

module.exports = function(app) {
    app.get('/appointments', appointments.index);
    app.get('/user/:name', users.getOneByName);
    app.get('/check/:date', appointments.check);
    app.post('/login', users.create);
    app.post('/createAppointment', appointments.create);
    app.post('/destroy/:id', appointments.destroy);
}
