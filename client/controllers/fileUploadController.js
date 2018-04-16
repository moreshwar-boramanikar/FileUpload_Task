app.controller("fileUploadController",function($scope,$timeout,$uibModal){
    
    var _this = this;
    _this.showUploadBtn = false;
    _this.showProgressBar = false;
   
    var jsonObj = [];
    //function to accept csv file
    $scope.parseCsvFile = function(evt){
        $scope.$apply(function() {
            _this.showProgressBar = true;
        });
        var elem = angular.element(document.getElementById("progressbar"));
        var files = evt.files[0];
        _this.fileName = files.name;
        
        var readCsv = new FileReader();
        var rowCount = 0;    
        //reads the file onload & pass one by one records to parseJSON() to for JSON object of each record
        readCsv.onload = function(event) {    
            const record = this.result.split('\n').length;
            Papa.parse(files, {
                header: true,
                worker:true,
                step: function(results) {
                    $timeout( function(){
                        jsonObj.push(results.data[0]);
                        // console.log(jsonObj);
                        var per = Math.round((rowCount++)/record*100);
                        elem[0].style.width = per + '%'; 
                        elem[0].innerHTML = per + '%';
                        if(per == 100)
                        {
                            _this.showUploadBtn = true;
                        }
                    }, 500);
                }
            });
        }
        readCsv.readAsText(files);
    }
});

app.directive('modal', function () {
    return {
        restrict: 'E',
        scope: { 
            fileName:'=fileName',
            handler: '=id'
        },
        templateUrl: '../views/showModal.html',
        transclude: true,
        controller: function ($scope,$timeout) {
            $scope.handler = 'modal'; 
            $scope.showMsg =false;
            $timeout( function(){
                $scope.showMsg = true;
            },8000 );
        },
    };
});