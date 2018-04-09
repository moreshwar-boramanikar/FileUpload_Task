app.controller("fileUploadController",function($scope,$timeout,$uibModal){
    $scope.showUploadBtn = false;
    $scope.showProgressBar = false;
    var csvColumns = [];
    var records = [];
    //function to accept csv file
    $scope.parseCsvFile = function(evt){
        //this show progress bar after file is selected
        $scope.$apply(function() {
            $scope.showProgressBar = true;
        });
        var files = evt.files;
        var csvFile = files[0];
        $scope.fileName = csvFile.name;
        var readCsv = new FileReader();
        //reads the file onload & pass one by one records to parseJSON() to for JSON object of each record
        readCsv.onload = function(event) {    
            const record = this.result.split('\n');
            csvColumns = record[0].split(",");
            for(var rec = 1; rec < record.length; rec++){
                parseJSON(record[rec]);
                //show % on progress bar dynamically as per records being processed
                $scope.$apply(function() {
                    $scope.showProgressWidth = Math.floor(rec/(record.length-1)*100);
                });  
                moveProgressBar(rec,record.length);
            }         
        }
        readCsv.readAsText(csvFile);
    }
    //creates JSON obj for each record
    function parseJSON(record){
        record = record.split(",");
        var parsedJsonObj={};
        for(var i in csvColumns){
            parsedJsonObj[csvColumns[i]] = record[i];
        }
        records.push(parsedJsonObj);
    }
    //calculate  width(in %) of progress bar dynamically as per records being processed
    function moveProgressBar(wdt,len) {
        var elem = document.getElementById("abc");
        var width = Math.floor(wdt/(len-1)*100);  
        $(function() {
            $("#progressbar").width(width +'%');
            $("#progressbar").html(width +'%');
          });
        // elem.style.width = width + '%'; 
        // elem.innerHTML = width * 1  + '%';
        if(width == 100){
            $scope.$apply(function() {
                $scope.showUploadBtn = true;
            });
        }
      }
      //opens modal on upload button to show JSON data is parsing
      $scope.openModal = function (size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/showModal.html',
          controller: 'ModalController',
          size:size,
          resolve: {
            data: function () {
              return $scope.fileName;
            }
          }})};
});
//controller for Modal
app.controller('ModalController', function ($scope,$timeout,$uibModalInstance, data) {
    $scope.fileName = data;
    
    $scope.showLoader = true;
        $timeout( function(){
            $scope.showLoader = false;
            $scope.showMsg = true;
            $scope.successParseMsg = "File Parsed Successfully!";
        }, 5000 );
    
    $scope.ok = function () {
      $uibModalInstance.close();
    };
  });
  