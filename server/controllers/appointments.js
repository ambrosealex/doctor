var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

var today = new Date();

module.exports = {
  index: function(req, res) {
      Appointment.find({date: {$gte:today}}).populate('_user').exec( function (err, appointments) {
          res.json({ appointments: appointments });
      })
  },
  create: function(req, res) {
      var appointment = new Appointment({
          date: req.body.newAppointment.date,
          time: req.body.newAppointment.time,
          period: req.body.newAppointment.period,
          _user: req.body.user,
          complaint: req.body.newAppointment.complaint
      });
      appointment.save(function (err){
          if(err){
              console.log(err);
          } else {
              console.log("Successfully Saved:", appointment);
          }
          res.json({ appointment: appointment })
      })
  },
    destroy: function(req, res) {
        console.log("REQ PARAMS:", req.params);
        Appointment.remove({_id: req.params.id}, function(err, appointment) {
            if(err){
                console.log(err);
            } else {
                console.log("Successfully Saved:", appointment);
            }
            res.json({update: "deleted"});
        })
    },
    check: function(req, res) {
        Appointment.find({}, function(err, appointments) {
            var interferences = [];
            console.log("REQ PARAMS DATE:", req.params.date);
            var d = new Date(req.params.date)
            var appointmentDate = d.getDate() + d.getMonth() + d.getFullYear();
            var checkingDate;
            for(var i =0; i<appointments.length;i++) {
                checkingDate = appointments[i].date.getDate() + appointments[i].date.getMonth() + appointments[i].date.getFullYear();
                if(checkingDate === appointmentDate){
                    console.log("MATCH");
                    interferences.push(appointments[i]);
                }
            }
            res.json({appointments: appointments, interferences: interferences});
        })
    }
}
