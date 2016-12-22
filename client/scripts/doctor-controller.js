app.controller("loginController", ["$scope", "doctorFactory", '$location', function ($scope, doctorFactory, $location) {
    doctorFactory.user = null;
    $scope.messages=[];
    $scope.callLoginUser = function(name){
        if(!name || name.length<3) {
            $scope.messages.push("Name must be at least 3 characters");
            return;
        }
        console.log("THIS IS THE NAME:", name);
        doctorFactory.getUser(name, function(user){
            console.log("THIS IS USER RESPONSE:", user);
            if(user) {
                doctorFactory.user= user;
                $location.url('/home');
            } else {
                doctorFactory.login(name, function(user) {
                    $location.url('/home');
                });
            }
        });
    }
}]);

app.controller("homeController", ["$scope", "doctorFactory", '$location', function ($scope, doctorFactory, $location) {
    $scope.appointments = [];
    $scope.user;
    doctorFactory.appointmentIndex(function (appointments, user) {
        $scope.user = user;
        console.log("THESE ARE THE Appointments", appointments);
        if(!user){
            $location.url('/');
        }
        $scope.appointments = appointments;
    });
    $scope.callDeleteAppointment = function (appointment) {
        console.log("DELETE CALL: ", appointment);
        doctorFactory.deleteAppointment(appointment, function(data) {
            doctorFactory.appointmentIndex(function (appointments, user) {
                $scope.user = user;
                $scope.appointments = appointments;
            });
        });
    }
}]);

app.controller("createController", ["$scope", "doctorFactory", '$location', function ($scope, doctorFactory, $location) {
    $scope.messages = [];
    $scope.user = doctorFactory.user;
    var now = Date.now();
    if(!$scope.user){
        $location.url('/');
    }
    $scope.callCreateAppointment = function(newAppointment) {
        $scope.messages = [];
        if(!newAppointment.date || !newAppointment.time || !newAppointment.complaint){
            $scope.messages.push("Please fill out all fields");
            return;
        }
        if (newAppointment.date<now) {
            $scope.messages.push("Appointments must be made after today's date");
        }
        if (newAppointment.time.getTime()<50400000 || newAppointment.time.getTime()>82800000) {
            $scope.messages.push("Appointments must be made between 8:00 AM and 5:00 PM");
        }
        if ($scope.messages.length>0){
            return;
        }
        if(newAppointment.time.getTime()<64800000) {
            newAppointment.period = "AM";
        }
        else {
            newAppointment.period = "PM";
        }
        doctorFactory.checkAvailability(newAppointment, function(interferences) {
            console.log("THESE ARE THE INTERFERENCES:", interferences);
            if(interferences.length>2) {
                $scope.messages.push("The Doctor is not available on this date.");
            }
            else {
                doctorFactory.createAppointment(newAppointment, function(appointment) {
                    $location.url('/home');
                })
            }
        })
    }
}]);
