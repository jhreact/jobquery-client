app.controller('AdminCompaniesNewCtrl', ['$scope', 'Company', function($scope, Company){

  var newCompany = {};
  newCompany.name = '';
  newCompany.location = '';
  newCompany.url = '';
  newCompany.tagline = '';
  newCompany.briefDescription = '';
  newCompany.media = [];
  newCompany.links = [];
  $scope.newCompany = newCompany;

  var removeEmptyFields = function(){
    newCompany.media = newCompany.media.filter(function(item){
      return item.text;
    });

    newCompany.links = newCompany.links.filter(function(item){
      return item.text;
    });
  };

  $scope.create = function(){
    removeEmptyFields();
    Company.create(newCompany).then(function(company){
      $scope.created = true;
    });
  };

  $scope.addMedia = function(){
    newCompany.media.push({text: ''});
  };

  $scope.removeMedia = function(index){
    newCompany.media.splice(index, 1);
  };

  $scope.addLink = function(){
    newCompany.links.push({text: ''});
  };

  $scope.removeLink = function(index){
    newCompany.links.splice(index, 1);
  };

}]);