var app = angular.module("fileupload", ['ui.router']);

app.config(function($stateProvider) {

    $stateProvider.state({
        name: 'fileUpload',
        url: '/fileUpload',
        controller:"fileUploadController",
        templateUrl: 'views/fileUpload.html'
    });

});