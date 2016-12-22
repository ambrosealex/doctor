app.factory("doctorFactory", ["$http", function ($http) {

    var factory = {};
    factory.user;
    factory.getUser = function(name, gotUser) {
        console.log("FACTORY LOG:", name);
        $http.get("/user/"+name).then(function (response) {
            console.log("FACTORY DATA", response.data.user);
            gotUser(response.data.user);
        });
    }
    factory.appointmentIndex = function (gotAppointments) {
        $http.get("/appointments").then(function (response) {
            gotAppointments(response.data.appointments, factory.user);
        });
    };
    factory.createAppointment = function (newAppointment, createdAppointment) {
        $http.post('/createAppointment', {newAppointment: newAppointment, user: factory.user}).then(function (response) {
            createdAppointment(response.data.appointment)
        });
    }
    factory.login = function(user, loggedInUser) {
        $http.post('/login', {name:user}).then(function (response) {
            factory.user = response.data.user;
            loggedInUser(response.data);
        });
    }
    factory.deleteAppointment = function(appointment, appointmentGotDeleted) {
        console.log("THIS IS THE POLL", appointment);
        $http.post('/destroy/'+appointment._id).then(function (response) {
            appointmentGotDeleted(response.data.appointment);
        })
    }
    factory.checkAvailability = function(appointment, checkedDate) {
        $http.get('/check/'+appointment.date).then(function (response) {
            checkedDate(response.data.interferences);
        })
    }
    return factory;

}]);
