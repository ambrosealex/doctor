var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/new_appointment", {
        templateUrl: "partials/create.html"
    });
    $routeProvider.when("/home", {
        templateUrl: "partials/home.html"
    });
    $routeProvider.otherwise({
        templateUrl: "partials/login.html"
    });
});
