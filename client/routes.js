var app = angular.module("fileupload", ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider,$urlRouterProvider) {

    $stateProvider.state({
        name: 'home',
        url: '/',
        templateUrl: 'views/home.html'
    });
    $stateProvider.state({
        name: 'fileUpload',
        url: '/fileUpload',
        controller:"fileUploadController",
        templateUrl: 'views/fileUpload.html',
    });
});