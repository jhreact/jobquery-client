app.factory('OpportunityResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/opportunities/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Opportunity', ['OpportunityResource', function(OpportunityResource) {
  var opportunityMethods = {};

  opportunityMethods.getAll = function () {
    return OpportunityResource.query().$promise;
  };

  opportunityMethods.get = function (id) {
    return OpportunityResource.get({_id: id}).$promise;
  };

  opportunityMethods.create = function (newOpportunity) {
    var opportunity = new OpportunityResource(newOpportunity);
    return opportunity.$save();
  };

  opportunityMethods.update = function (opportunity) {
    console.log('In OpportunityModel.update');
    console.dir(opportunity);
    console.log(opportunity._id);
    return OpportunityResource.update({_id: opportunity._id}, opportunity).$promise;
  };

  return opportunityMethods;
}]);
