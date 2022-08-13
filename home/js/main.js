// create the module and name it scotchApp
var snakeApp = angular.module('snakeApp', ['ngRoute']);


// configure our routes
snakeApp.config(function($routeProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })

    // route for the about page
    .when('/about', {
        templateUrl : 'pages/about.html',
        controller  : 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
        templateUrl : 'pages/contact.html',
        controller  : 'contactController'
    })
    
    // route for the project page
    .when('/project', {
        templateUrl : 'pages/project.html',
        controller  : 'projectController'
    });
});

// create the controller and inject Angular's $scope
snakeApp.controller('mainController', function($scope, $location, $window) {
    // create a message to display in our view
    $scope.message = 'My code works but I don\'t know why...';
    if ( $('#cursor').length > 0) setInterval(cursorAnimation, 600);
    
    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
});

// create the controller and inject Angular's $scope
snakeApp.controller('aboutController', function($scope, $location, $window) {
    $scope.message = 'Look! I am an about page.';

    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
});

// create the controller and inject Angular's $scope
snakeApp.controller('contactController', function($scope, $location, $window) {
    $scope.message = 'Contact us! JK. This is just a demo.';
    
    
    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
});

// create the controller and inject Angular's $scope
snakeApp.controller('projectController', function($scope, $location, $window) {
    $scope.message = 'This will show the project I have been involved.';
    
    
    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
});

function cursorAnimation() {
  $('#cursor')
  .animate({ opacity: 0 }, 'fast', 'swing')
  .animate({ opacity: 1 }, 'fast', 'swing');
}
