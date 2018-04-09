var app = angular.module("fileupload");

app.controller("fileUploadController",function($scope,$timeout){
    console.log("File Upload Cotroller");
    $scope.show = false;
    $scope.showProgressBar = false;
    var csvColumns = [];
    var records = [];

    $scope.parseCsvFile = function(evt){
        $scope.$apply(function() {
            $scope.showProgressBar = true;
        });
        
        var files = evt.files;
        var csvFile = files[0];
        $scope.fileName = csvFile.name;
        var reader = new FileReader();

        reader.onload = function(event) {    
            const lines = this.result.split('\n');
            csvColumns = lines[0].split(",");
            for(var line = 1; line < lines.length; line++){
                console.log(lines[line]);
                parseJSON(lines[line]);
                move((line)/(lines.length-1)*100);
            }         
        }
        reader.readAsText(csvFile);
    }

    function parseJSON(line){
        line = line.split(",");
        var obj={};
        for(var i in csvColumns){
            obj[csvColumns[i]] = line[i];
        }
        records.push(obj);
    }

    $scope.upload = function(){
        $scope.showLoader = true;
        $timeout( function(){
            $scope.showLoader = false;
            $scope.showMsg = true;
            $scope.successMsg = "File Parsed Successfully!";
        }, 5000 );
    }

    function move(w) {
        var elem = document.getElementById("myBar");   
        var width = w;
        elem.style.width = width + '%'; 
        elem.innerHTML = width * 1  + '%';
        if(width == 100){
            $scope.$apply(function() {
                $scope.show = true;
            });
        }
      }
});