angular.module('appControllers',[])
.controller('homeCtrl',function($scope){
  
  $scope.pdfName = 'Resume';
  $scope.pdfUrl = '../pdf/Resume_AdityaSanghi.pdf';
  $scope.scroll = 0;
  $scope.loading = 'loading';
  var canvas = document.getElementById('pdf');
  var ctx = canvas.getContext('2d');
  $scope.getNavStyle = function(scroll) {
    if(scroll > 100) return 'pdf-controls fixed';
    else return 'pdf-controls';
  }

  $scope.onError = function(error) {
    console.log(error);
  }

  $scope.onLoad = function() {
    $scope.loading = '';
  }

  $scope.onProgress = function(progress) {
    console.log(progress);
  }

  PDFJS.getDocument('../pdf/Resume_AdityaSanghi.pdf').then(function(data){
     console.log(data);
     data.getPage(1).then(function(page) {
            var viewport = page.getViewport(0.8),
              renderContext = {};

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };

            page.render(renderContext);
            $scope.$apply(function() {
              //scope.pageCount = _pdfDoc.numPages;
            });
          });
  });
});