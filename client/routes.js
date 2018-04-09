var app = angular.module("fileupload", ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) {

    $stateProvider.state({
        name: 'fileUpload',
        url: '/fileUpload',
        controller:"fileUploadController",
        templateUrl: 'views/fileUpload.html'
    });

});